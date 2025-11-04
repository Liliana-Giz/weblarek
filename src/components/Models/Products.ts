import { IProduct } from '../../types';

export class Products {
    protected items: IProduct[] = [];
    protected selectedProduct: IProduct | null = null;

    // сохраняет массив товаров
    setItems(items: IProduct[]): void {
        this.items = Array.isArray(items) ? [...items] : [];
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
    }

    // возвращает товар для подробного отображения
    getSelectedItem(): IProduct | null {
        return this.selectedProduct;
    }
}

export default Products;


