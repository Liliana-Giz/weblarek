import CardBase, { CardActions } from './CardBase';
import { IProduct } from '../../types';

export class CatalogCard extends CardBase {
    private rootBtn: HTMLElement;
    constructor(template: HTMLTemplateElement, actions: CardActions = {}) {
        const fragment = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
        super(fragment, actions);
        this.rootBtn = fragment as HTMLElement;
        this.bindClick(this.rootBtn);
    }
    override render(data?: Partial<IProduct>): HTMLElement {
        if (data?.id) this.idValue = data.id;
        return super.render(data);
    }
}

export default CatalogCard;


