import { IProduct } from '../../types';
import { IEvents } from '../base/Events';
import { AppEvents } from '../../utils/constants';

export class Products {
    protected items: IProduct[] = [];
    protected selectedProduct: IProduct | null = null;
    protected events?: IEvents;

    constructor(events?: IEvents) {
        this.events = events;
    }

    // сохраняет массив товаров
    setItems(items: IProduct[]): void {
        this.items = Array.isArray(items) ? [...items] : [];
        this.events?.emit(AppEvents.ProductsChanged, { items: this.getItems() });
    }

    // возвращает массив всех товаров
    getItems(): IProduct[] {
        return [...this.items];
    }

    // возвращает товар по id
    getItemById(id: string): IProduct | undefined {
        return this.items.find((p) => p.id === id);
    }

    // сохраняет товар для подробного отображения
    setSelectedItem(product: IProduct | null): void {
        this.selectedProduct = product;
        this.events?.emit(AppEvents.ProductSelected, { product: this.selectedProduct });
    }

    // возвращает товар для подробного отображения
    getSelectedItem(): IProduct | null {
        return this.selectedProduct;
    }
}

export default Products;


