import CardBase from './CardBase';
import { IProduct } from '../../types';

export interface PreviewActions {
    onBuy?: (id: string) => void;
    onRemove?: (id: string) => void;
}

export class PreviewCard extends CardBase {
    private buyBtn: HTMLButtonElement;
    constructor(template: HTMLTemplateElement, private actions: PreviewActions = {}) {
        const fragment = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
        super(fragment);
        this.buyBtn = fragment.querySelector('.card__button') as HTMLButtonElement;
        this.buyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.buyBtn.dataset.mode === 'remove') this.actions.onRemove?.(this.id);
            else this.actions.onBuy?.(this.id);
        });
    }
    setBuyState(inCart: boolean, price: number | null) {
        if (price === null) {
            this.buyBtn.disabled = true;
            this.buyBtn.textContent = 'Недоступно';
            this.buyBtn.dataset.mode = '';
            return;
        }
        this.buyBtn.disabled = false;
        if (inCart) {
            this.buyBtn.textContent = 'Удалить из корзины';
            this.buyBtn.dataset.mode = 'remove';
        } else {
            this.buyBtn.textContent = 'В корзину';
            this.buyBtn.dataset.mode = 'buy';
        }
    }
    override render(data?: Partial<IProduct> & { inCart?: boolean }): HTMLElement {
        if (data?.id) this.idValue = data.id;
        const el = super.render(data as Partial<IProduct>);
        if (data) {
            this.setBuyState(Boolean(data.inCart), data.price ?? null);
        }
        return el;
    }
}

export default PreviewCard;


