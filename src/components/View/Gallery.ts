import { Component } from '../base/Component';

export class Gallery extends Component<unknown> {
    constructor(container: HTMLElement) {
        super(container);
    }
    setItems(nodes: HTMLElement[]) {
        this.container.replaceChildren(...nodes);
    }
}

export default Gallery;


