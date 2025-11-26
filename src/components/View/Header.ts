import { Component } from '../base/Component';

export interface HeaderActions {
    onOpenCart?: () => void;
}

export class Header extends Component<unknown> {
    private basketBtn: HTMLButtonElement;
    private counterEl: HTMLElement;
    constructor(container: HTMLElement, private actions: HeaderActions = {}) {
        super(container);
        this.basketBtn = container.querySelector('.header__basket') as HTMLButtonElement;
        this.counterEl = container.querySelector('.header__basket-counter') as HTMLElement;
        this.basketBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.actions.onOpenCart?.();
        });
    }
    setCounter(count: number) {
        this.counterEl.textContent = String(count);
    }
}

export default Header;


