import { Component } from '../base/Component';
import { IProduct } from '../../types';
import { categoryMap, CDN_URL } from '../../utils/constants';

export interface CardActions {
    onClick?: (id: string) => void;
}

export class CardBase extends Component<IProduct> {
    protected id!: string;
    protected titleEl: HTMLElement;
    protected imageEl: HTMLImageElement;
    protected categoryEl: HTMLElement | null;
    protected priceEl: HTMLElement | null;
    constructor(container: HTMLElement, protected actions: CardActions = {}) {
        super(container);
        this.titleEl = container.querySelector('.card__title') as HTMLElement;
        this.imageEl = container.querySelector('.card__image') as HTMLImageElement;
        this.categoryEl = container.querySelector('.card__category') as HTMLElement;
        this.priceEl = container.querySelector('.card__price') as HTMLElement;
    }
    protected set idValue(value: string) {
        this.id = value;
    }
    set title(value: string) {
        if (this.titleEl) this.titleEl.textContent = value;
    }
    set image(value: string) {
        const url = value.startsWith('http') ? value : `${CDN_URL}${value}`;
        this.setImage(this.imageEl, url, this.titleEl?.textContent || '');
    }
    set category(value: string) {
        if (this.categoryEl) {
            this.categoryEl.textContent = value;
            Object.values(categoryMap).forEach((cls) => this.categoryEl!.classList.remove(cls));
            const cls = (categoryMap as Record<string, string>)[value] || categoryMap['другое'];
            this.categoryEl.classList.add(cls);
        }
    }
    set price(value: number | null) {
        if (this.priceEl) {
            this.priceEl.textContent = value === null ? 'Бесценно' : `${value} синапсов`;
        }
    }
    bindClick(root: HTMLElement) {
        root.addEventListener('click', () => this.actions.onClick?.(this.id));
    }
}

export default CardBase;


