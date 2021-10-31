import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
    @Input() form: FormGroup;
    @Output() loginSubmit = new EventEmitter<void>();
}
