import { Component } from '../base/Component';

export interface SuccessActions {
    onClose?: () => void;
}

export class SuccessMessage extends Component<unknown> {
    private descEl: HTMLElement;
    private closeBtn: HTMLButtonElement;
    constructor(template: HTMLTemplateElement, private actions: SuccessActions = {}) {
        const fragment = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
        super(fragment);
        this.descEl = fragment.querySelector('.order-success__description') as HTMLElement;
        this.closeBtn = fragment.querySelector('.order-success__close') as HTMLButtonElement;
        this.closeBtn.addEventListener('click', () => this.actions.onClose?.());
    }
    setTotal(total: number) {
        this.descEl.textContent = `Списано ${total} синапсов`;
    }
}

export default SuccessMessage;


