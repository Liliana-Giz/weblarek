import { IBuyer } from '../../types';

type ValidationErrors = Partial<Record<keyof IBuyer, string>>;

export class Buyer {
    protected data: Partial<IBuyer> = {};

    // сохраняет данные покупателя (частично, не затирая остальные поля)
    setData(part: Partial<IBuyer>): void {
        this.data = { ...this.data, ...part };
    }

    // возвращает все текущие данные покупателя
    getData(): Partial<IBuyer> {
        return { ...this.data };
    }

    // очищает все данные покупателя
    clear(): void {
        this.data = {};
    }

    // валидирует поля; если fields не задан, проверяет все
    validate(fields?: Array<keyof IBuyer>): ValidationErrors {
        const toCheck = (fields && fields.length > 0) ? fields : (['payment', 'email', 'phone', 'address'] as Array<keyof IBuyer>);
        const errors: ValidationErrors = {};

        for (const key of toCheck) {
            const value = this.data[key];
            if (value === undefined || value === null || String(value).trim() === '') {
                switch (key) {
                    case 'payment':
                        errors.payment = 'Не выбран способ оплаты';
                        break;
                    case 'address':
                        errors.address = 'Не указан адрес доставки';
                        break;
                    case 'email':
                        errors.email = 'Укажите емэйл';
                        break;
                    case 'phone':
                        errors.phone = 'Укажите телефон';
                        break;
                }
            }
        }

        return errors;
    }
}

export default Buyer;


