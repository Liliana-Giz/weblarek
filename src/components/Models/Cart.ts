import { IProduct } from '../../types';
import { IEvents } from '../base/Events';
import { AppEvents } from '../../utils/constants';

export class Cart {
    protected items: IProduct[] = [];
    protected events?: IEvents;

    constructor(events?: IEvents) {
        this.events = events;
    }

    // возвращает массив товаров в корзине
    getItems(): IProduct[] {
        return [...this.items];
    }

    // добавляет товар в корзину
    add(product: IProduct): void {
        if (!this.hasItem(product.id)) {
            this.items = [...this.items, product];
            this.events?.emit(AppEvents.CartChanged, { items: this.getItems(), total: this.getTotal() });
        }
    }

    // удаляет товар из корзины по id
    removeById(id: string): void {
        this.items = this.items.filter((p) => p.id !== id);
        this.events?.emit(AppEvents.CartChanged, { items: this.getItems(), total: this.getTotal() });
    }

    // удаляет товар из корзины по объекту
    remove(product: IProduct): void {
        this.removeById(product.id);
    }

    // очищает корзину
    clear(): void {
        this.items = [];
        this.events?.emit(AppEvents.CartChanged, { items: this.getItems(), total: this.getTotal() });
    }

    // возвращает суммарную стоимость товаров
    getTotal(): number {
        return this.items.reduce((sum, p) => sum + (typeof p.price === 'number' ? p.price : 0), 0);
    }

    // возвращает количество товаров в корзине
    getCount(): number {
        return this.items.length;
    }

    // проверяет наличие товара в корзине
    hasItem(id: string): boolean {
        return this.items.some((p) => p.id === id);
    }
}

export default Cart;


