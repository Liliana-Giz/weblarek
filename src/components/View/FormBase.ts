import { Component } from '../base/Component';

export class FormBase extends Component<unknown> {
    protected form: HTMLFormElement;
    protected submitBtn: HTMLButtonElement;
    protected errorsEl: HTMLElement;
    constructor(form: HTMLFormElement) {
        super(form);
        this.form = form;
        this.submitBtn = form.querySelector('button[type=\"submit\"]') as HTMLButtonElement;
        this.errorsEl = form.querySelector('.form__errors') as HTMLElement;
    }
    setSubmitEnabled(enabled: boolean) {
        this.submitBtn.disabled = !enabled;
    }
    setErrors(text: string) {
        this.errorsEl.textContent = text;
    }
}

export default FormBase;


