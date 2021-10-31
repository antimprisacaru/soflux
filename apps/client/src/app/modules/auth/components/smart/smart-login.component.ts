import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserLogin } from '../../state/auth.actions';
import { State } from '../../../../state';

@Component({
    selector: 'app-smart-login',
    template: `<app-login-form [form]="form" (loginSubmit)="submit()"></app-login-form>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartLoginComponent {
    form: FormGroup = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });

    constructor(private fb: FormBuilder, private store: Store<State>) {}

    submit(): void {
        this.store.dispatch(new UserLogin(this.form.value));
    }
}
