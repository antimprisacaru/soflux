import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegister } from '../../state/auth.actions';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';

@Component({
    selector: 'app-smart-register',
    template: `<app-register-form [form]="form" (registerSubmit)="submit()"></app-register-form>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartRegisterComponent {
    form: FormGroup = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor(private fb: FormBuilder, private store: Store<State>) {}

    submit(): void {
        this.store.dispatch(new UserRegister(this.form.value));
    }
}
