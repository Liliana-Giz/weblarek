import { IApi, IOrderRequest, IOrderResponse, IProduct, IProductListResponse } from '../../types';

// Формат, который ожидает бэкенд (payment: 'online' | 'cash')
interface IOrderPayload {
    payment: 'online' | 'cash';
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

class WebLarekApi {
    constructor(private readonly api: IApi) {}

    // получает каталог товаров
    async getProducts(): Promise<IProduct[]> {
        const data = await this.api.get<IProductListResponse>('/product/');
        return data.items;
    }

    // отправляет заказ на сервер
    createOrder(order: IOrderRequest): Promise<IOrderResponse> {
        // Бэкенд ожидает 'online' вместо 'card'
        const payload: IOrderPayload = {
            payment: order.payment === 'card' ? 'online' : 'cash',
            email: order.email,
            phone: order.phone,
            address: order.address,
            total: order.total,
            items: order.items,
        };
        return this.api.post<IOrderResponse>('/order', payload);
    }
}

export default WebLarekApi;


