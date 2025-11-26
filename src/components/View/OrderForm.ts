import FormBase from './FormBase';
import { IBuyer } from '../../types';

export interface OrderFormActions {
    onChange?: (data: Partial<IBuyer>) => void;
    onNext?: () => void;
}

export class OrderForm extends FormBase {
    private cardBtn: HTMLButtonElement;
    private cashBtn: HTMLButtonElement;
    private addressInput: HTMLInputElement;
    constructor(template: HTMLTemplateElement, private actions: OrderFormActions = {}) {
        const fragment = template.content.firstElementChild!.cloneNode(true) as HTMLFormElement;
        super(fragment);
        this.cardBtn = fragment.querySelector('button[name=\"card\"]') as HTMLButtonElement;
        this.cashBtn = fragment.querySelector('button[name=\"cash\"]') as HTMLButtonElement;
        this.addressInput = fragment.querySelector('input[name=\"address\"]') as HTMLInputElement;
        this.cardBtn.addEventListener('click', () => this.setPayment('card'));
        this.cashBtn.addEventListener('click', () => this.setPayment('cash'));
        this.addressInput.addEventListener('input', () => this.actions.onChange?.({ address: this.addressInput.value }));
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.actions.onNext?.();
        });
    }
    private setPayment(payment: 'card' | 'cash') {
        this.cardBtn.classList.toggle('button_alt-active', payment === 'card');
        this.cashBtn.classList.toggle('button_alt-active', payment === 'cash');
        this.actions.onChange?.({ payment });
    }
    setValid(valid: boolean, errorText: string) {
        this.setSubmitEnabled(valid);
        this.setErrors(errorText);
    }
}

export default OrderForm;


