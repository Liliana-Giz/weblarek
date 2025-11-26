import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { AppEvents } from '../../utils/constants';

type ModalContent = HTMLElement;

export class Modal extends Component<unknown> {
    private readonly containerEl: HTMLElement;
    private readonly contentEl: HTMLElement;
    private readonly closeBtn: HTMLElement;
    private isOpen = false;
    constructor(root: HTMLElement, private readonly events: IEvents) {
        super(root);
        this.containerEl = root;
        this.contentEl = root.querySelector('.modal__content') as HTMLElement;
        this.closeBtn = root.querySelector('.modal__close') as HTMLElement;
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.init();
    }
    private init() {
        this.containerEl.addEventListener('click', this.handleOverlayClick);
        this.closeBtn.addEventListener('click', this.handleCloseClick);
    }
    private handleOverlayClick(e: MouseEvent) {
        if (e.target === this.containerEl) this.close();
    }
    private handleCloseClick() {
        this.close();
    }
    setContent(content: ModalContent) {
        this.contentEl.replaceChildren(content);
    }
    open() {
        if (this.isOpen) return;
        this.containerEl.classList.add('modal_active');
        this.isOpen = true;
        this.events.emit(AppEvents.ModalOpen, {});
    }
    close() {
        if (!this.isOpen) return;
        this.containerEl.classList.remove('modal_active');
        this.contentEl.replaceChildren();
        this.isOpen = false;
        this.events.emit(AppEvents.ModalClose, {});
    }
}

export default Modal;


