import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'auth-sketch',
    templateUrl: './auth-sketch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthSketchComponent {}
