import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-alert-list',
    template: `
        <app-alert
            *ngFor="let message of alertService.messagesSubject$ | async; let i = index"
            @inOutAnimation
            [message]="message"
        ></app-alert>
    `,
    animations: [
        trigger('inOutAnimation', [
            state('in', style({ opacity: 1 })),
            transition(':enter', [style({ opacity: '0' }), animate('.5s ease-out', style({ opacity: '1' }))]),
            transition(':leave', [style({ opacity: '1' }), animate('.5s ease-out', style({ opacity: '0' }))])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertListComponent {
    constructor(public alertService: AlertService) {}

    onClickDelete(i: number): void {
        this.alertService.clear(i);
    }
}
