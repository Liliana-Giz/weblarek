import { IProduct } from '../../types';

export class Cart {
    protected items: IProduct[] = [];

    // возвращает массив товаров в корзине
    getItems(): IProduct[] {
        return [...this.items];
    }

    // добавляет товар в корзину
    add(product: IProduct): void {
        if (!this.has(product.id)) {
            this.items = [...this.items, product];
        }
    }

    // удаляет товар из корзины по id
    removeById(id: string): void {
        this.items = this.items.filter((p) => p.id !== id);
    }

    // удаляет товар из корзины по объекту
    remove(product: IProduct): void {
        this.removeById(product.id);
    }

    // очищает корзину
    clear(): void {
        this.items = [];
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
    has(id: string): boolean {
        return this.items.some((p) => p.id === id);
    }
}

export default Cart;


