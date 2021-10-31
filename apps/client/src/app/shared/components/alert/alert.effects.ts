import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map, tap } from 'rxjs/operators';
import { AlertActionTypes, AlertClose, AlertOpen } from './alert.actions';
import { AlertService } from '../../services/alert.service';

@Injectable()
export class AlertEffects {
    constructor(private actions$: Actions, private alertService: AlertService) {}

    alertClose$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType<AlertClose>(AlertActionTypes.ALERT_CLOSE),
                tap(() => this.alertService.clearLast())
            ),
        { dispatch: false }
    );

    alertOpen$ = createEffect(() =>
        this.actions$.pipe(
            ofType<AlertOpen>(AlertActionTypes.ALERT_OPEN),
            map(action => {
                window.scrollTo(0, 0);
                this.alertService.add(action.payload.message, action.payload.type);
            }),
            delay(5000),
            map(() => new AlertClose())
        )
    );
}
