import FormBase from './FormBase';
import { IBuyer } from '../../types';

export interface ContactsFormActions {
    onChange?: (data: Partial<IBuyer>) => void;
    onSubmit?: () => void;
}

export class ContactsForm extends FormBase {
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;
    constructor(template: HTMLTemplateElement, private actions: ContactsFormActions = {}) {
        const fragment = template.content.firstElementChild!.cloneNode(true) as HTMLFormElement;
        super(fragment);
        this.emailInput = fragment.querySelector('input[name=\"email\"]') as HTMLInputElement;
        this.phoneInput = fragment.querySelector('input[name=\"phone\"]') as HTMLInputElement;
        this.emailInput.addEventListener('input', () => this.actions.onChange?.({ email: this.emailInput.value }));
        this.phoneInput.addEventListener('input', () => this.actions.onChange?.({ phone: this.phoneInput.value }));
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.actions.onSubmit?.();
        });
    }
    setValid(valid: boolean, errorText: string) {
        this.setSubmitEnabled(valid);
        this.setErrors(errorText);
    }
}

export default ContactsForm;


