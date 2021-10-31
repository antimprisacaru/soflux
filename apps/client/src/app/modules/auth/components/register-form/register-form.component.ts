import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
    @Input() form: FormGroup;
    @Output() registerSubmit = new EventEmitter<void>();
}
