import { Component } from '../base/Component';

export interface BasketViewActions {
    onCheckout?: () => void;
}

export class BasketView extends Component<unknown> {
    private listEl: HTMLElement;
    private totalEl: HTMLElement;
    private checkoutBtn: HTMLButtonElement;
    constructor(template: HTMLTemplateElement, private actions: BasketViewActions = {}) {
        const fragment = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
        super(fragment);
        this.listEl = fragment.querySelector('.basket__list') as HTMLElement;
        this.totalEl = fragment.querySelector('.basket__price') as HTMLElement;
        this.checkoutBtn = fragment.querySelector('.basket__button') as HTMLButtonElement;
        this.checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.actions.onCheckout?.();
        });
    }
    setItems(items: HTMLElement[]) {
        if (items.length === 0) {
            this.listEl.replaceChildren();
        } else {
            this.listEl.replaceChildren(...items);
        }
    }
    setTotal(total: number) {
        this.totalEl.textContent = `${total} синапсов`;
    }
    setCheckoutEnabled(enabled: boolean) {
        this.checkoutBtn.disabled = !enabled;
    }
}

export default BasketView;


