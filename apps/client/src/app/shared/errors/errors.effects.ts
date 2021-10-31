import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthError, ErrorsActionTypes, HttpError } from './errors.actions';
import { map } from 'rxjs/operators';
import { AlertOpen } from '../components/alert/alert.actions';
import { AlertType } from '../models/alert.model';

@Injectable()
export class ErrorsEffects {
    constructor(private actions$: Actions) {}

    error$ = createEffect(() =>
        this.actions$.pipe(
            ofType<HttpError | AuthError>(ErrorsActionTypes.HTTP_ERROR, ErrorsActionTypes.AUTH_ERROR),
            map(
                message =>
                    new AlertOpen({
                        message: message.payload,
                        type: AlertType.ERROR
                    })
            )
        )
    );
}
