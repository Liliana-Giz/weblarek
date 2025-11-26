import CardBase from './CardBase';
import { IProduct } from '../../types';

export interface BasketItemActions {
    onRemove?: (id: string) => void;
}

export class BasketItem extends CardBase {
    private deleteBtn: HTMLButtonElement;
    private indexEl: HTMLElement;
    constructor(template: HTMLTemplateElement, private actions: BasketItemActions = {}) {
        const fragment = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
        super(fragment);
        this.deleteBtn = fragment.querySelector('.basket__item-delete') as HTMLButtonElement;
        this.indexEl = fragment.querySelector('.basket__item-index') as HTMLElement;
        this.deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.actions.onRemove?.(this.id);
        });
    }
    set index(value: number) {
        this.indexEl.textContent = String(value);
    }
    override render(data?: Partial<IProduct> & { index?: number }) {
        if (data?.id) this['idValue'] = data.id;
        const el = super.render(data);
        if (data?.index !== undefined) this.index = data.index!;
        return el;
    }
}

export default BasketItem;


