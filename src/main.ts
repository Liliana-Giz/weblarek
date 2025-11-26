import './scss/styles.scss';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { API_URL, AppEvents } from './utils/constants';
import WebLarekApi from './components/services/WebLarekApi';
import Products from './components/Models/Products';
import Cart from './components/Models/Cart';
import Buyer from './components/Models/Buyer';
import Gallery from './components/View/Gallery';
import CatalogCard from './components/View/CatalogCard';
import PreviewCard from './components/View/PreviewCard';
import BasketItem from './components/View/BasketItem';
import BasketView from './components/View/BasketView';
import Header from './components/View/Header';
import Modal from './components/View/Modal';
import OrderForm from './components/View/OrderForm';
import ContactsForm from './components/View/ContactsForm';
import { IBuyer } from './types';

// Брокер событий
const events = new EventEmitter();

// МОДЕЛИ ДАННЫХ
const productsModel = new Products(events);
const cartModel = new Cart(events);
const buyerModel = new Buyer(events);

// СЕРВИС API
const api = new Api(API_URL);
const service = new WebLarekApi(api);

// ЭЛЕМЕНТЫ DOM И ТЕМПЛЕЙТЫ
const galleryRoot = document.querySelector('main.gallery') as HTMLElement;
const headerRoot = document.querySelector('.header') as HTMLElement;
const modalRoot = document.getElementById('modal-container') as HTMLElement;
const tplCatalog = document.getElementById('card-catalog') as HTMLTemplateElement;
const tplPreview = document.getElementById('card-preview') as HTMLTemplateElement;
const tplBasketItem = document.getElementById('card-basket') as HTMLTemplateElement;
const tplBasket = document.getElementById('basket') as HTMLTemplateElement;
const tplOrder = document.getElementById('order') as HTMLTemplateElement;
const tplContacts = document.getElementById('contacts') as HTMLTemplateElement;
const tplSuccess = document.getElementById('success') as HTMLTemplateElement;

// VIEW КОМПОНЕНТЫ
const gallery = new Gallery(galleryRoot);
const header = new Header(headerRoot, {
    onOpenCart: () => openCart(),
});
const modal = new Modal(modalRoot, events);

// ХЕЛПЕРЫ РЕНДЕРА
function renderCatalog() {
    const items = productsModel.getItems();
    const nodes = items.map((item) => {
        const card = new CatalogCard(tplCatalog, {
            onClick: (id) => productsModel.setSelectedItem(productsModel.getItemById(id) || null),
        });
        return card.render(item);
    });
    gallery.setItems(nodes);
}

function openPreview(productId: string) {
    const product = productsModel.getItemById(productId);
    if (!product) return;
    const inCart = cartModel.hasItem(product.id);
    const preview = new PreviewCard(tplPreview, {
        onBuy: (id) => {
            const p = productsModel.getItemById(id);
            if (p) cartModel.add(p);
            modal.close();
        },
        onRemove: (id) => {
            cartModel.removeById(id);
            modal.close();
        },
    });
    const node = preview.render({ ...product, inCart });
    modal.setContent(node);
    modal.open();
}

function openCart() {
    const basketView = new BasketView(tplBasket, {
        onCheckout: () => openOrderStep1(),
    });
    const items = cartModel.getItems().map((p, idx) => {
        const item = new BasketItem(tplBasketItem, {
            onRemove: (id) => cartModel.removeById(id),
        });
        return item.render({ ...p, index: idx + 1 });
    });
    basketView.setItems(items);
    basketView.setTotal(cartModel.getTotal());
    basketView.setCheckoutEnabled(cartModel.getCount() > 0);
    modal.setContent(basketView.render());
    modal.open();
}

function openOrderStep1() {
    const form = new OrderForm(tplOrder, {
        onChange: (data: Partial<IBuyer>) => buyerModel.setData(data),
        onNext: () => openOrderStep2(),
    });
    // первичная валидация
    const errors = buyerModel.validate(['payment', 'address']);
    form.setValid(Object.keys(errors).length === 0, Object.values(errors).join('. '));
    // слушать изменения покупателя и обновлять валидность
    const updateValidity = () => {
        const errs = buyerModel.validate(['payment', 'address']);
        form.setValid(Object.keys(errs).length === 0, Object.values(errs).join('. '));
    };
    events.on(AppEvents.BuyerChanged, updateValidity);
    modal.setContent(form.render());
    modal.open();
}

function openOrderStep2() {
    const form = new ContactsForm(tplContacts, {
        onChange: (data: Partial<IBuyer>) => buyerModel.setData(data),
        onSubmit: () => submitOrder(),
    });
    const errors = buyerModel.validate(['email', 'phone']);
    form.setValid(Object.keys(errors).length === 0, Object.values(errors).join('. '));
    const updateValidity = () => {
        const errs = buyerModel.validate(['email', 'phone']);
        form.setValid(Object.keys(errs).length === 0, Object.values(errs).join('. '));
    };
    events.on(AppEvents.BuyerChanged, updateValidity);
    modal.setContent(form.render());
    modal.open();
}

function submitOrder() {
    const buyer = buyerModel.getData();
    const items = cartModel.getItems().map((p) => p.id);
    const total = cartModel.getTotal();
    if (!buyer.payment || !buyer.address || !buyer.email || !buyer.phone || items.length === 0) return;
    service
        .createOrder({
            payment: buyer.payment,
            address: buyer.address,
            email: buyer.email,
            phone: buyer.phone,
            items,
            total,
        })
        .then((res) => {
            // показать success
            const fragment = tplSuccess.content.firstElementChild!.cloneNode(true) as HTMLElement;
            const desc = fragment.querySelector('.order-success__description') as HTMLElement;
            const closeBtn = fragment.querySelector('.order-success__close') as HTMLButtonElement;
            desc.textContent = `Списано ${res.total} синапсов`;
            closeBtn.addEventListener('click', () => modal.close());
            modal.setContent(fragment);
            modal.open();
            // очистить данные
            cartModel.clear();
            buyerModel.clear();
        })
        .catch((e) => {
            console.error(e);
        });
}

// ПОДПИСКИ НА СОБЫТИЯ МОДЕЛЕЙ
events.on(AppEvents.ProductsChanged, () => renderCatalog());
events.on(AppEvents.ProductSelected, (data: { product: { id: string } | null }) => {
    if (data.product) openPreview(data.product.id);
});
events.on(AppEvents.CartChanged, () => {
    header.setCounter(cartModel.getCount());
});

// СТАРТ: ЗАГРУЗКА КАТАЛОГА
service
    .getProducts()
    .then((items) => productsModel.setItems(items))
    .catch((e) => console.error('Ошибка получения каталога:', e));
