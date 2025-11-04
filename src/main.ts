import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import WebLarekApi from './components/services/WebLarekApi';
import Products from './components/Models/Products';
import Cart from './components/Models/Cart';
import Buyer from './components/Models/Buyer';

// МОДЕЛИ ДАННЫХ
const productsModel = new Products();
const cartModel = new Cart();
const buyerModel = new Buyer();

// Тестирование Products
productsModel.setItems(apiProducts.items);
console.log('Массив товаров из каталога:', productsModel.getItems());
const firstId = productsModel.getItems()[0]?.id;
if (firstId) {
    productsModel.setSelectedItem(productsModel.getItemById(firstId) || null);
    console.log('Выбранный товар:', productsModel.getSelectedItem());
}

// Тестирование Cart
const first = productsModel.getItems()[0];
if (first) {
    cartModel.add(first);
    console.log('Корзина после добавления:', cartModel.getItems());
    console.log('Сумма и количество:', { total: cartModel.getTotal(), count: cartModel.getCount() });
    cartModel.removeById(first.id);
    console.log('Корзина после удаления:', cartModel.getItems());
}

// Тестирование Buyer
buyerModel.setData({ address: 'Spb Vosстанia 1' });
buyerModel.setData({ payment: 'card' });
console.log('Данные покупателя:', buyerModel.getData());
console.log('Ошибки покупателя (email, phone):', buyerModel.validate(['email', 'phone']));
buyerModel.clear();
console.log('Данные покупателя после очистки:', buyerModel.getData());

// СЛОЙ КОММУНИКАЦИИ: запрос каталога с сервера
const api = new Api(API_URL);
const service = new WebLarekApi(api);

service
    .getProducts()
    .then((items) => {
        productsModel.setItems(items);
        console.log('Каталог, полученный с сервера:', productsModel.getItems());
    })
    .catch((e) => console.error('Ошибка получения каталога:', e));
