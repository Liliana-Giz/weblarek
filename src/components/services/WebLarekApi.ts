import { IApi, IOrderRequest, IOrderResponse, IProduct, IProductListResponse } from '../../types';

export class WebLarekApi {
    constructor(private readonly api: IApi) {}

    // получает каталог товаров
    async getProducts(): Promise<IProduct[]> {
        const data = await this.api.get<IProductListResponse>('/product/');
        return data.items;
    }

    // отправляет заказ на сервер
    createOrder(order: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order', order);
    }
}

export default WebLarekApi;


