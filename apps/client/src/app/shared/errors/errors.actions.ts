import { Action } from '@ngrx/store';

export enum ErrorsActionTypes {
    HTTP_ERROR = '[Error] Http Error Occurred',
    AUTH_ERROR = '[Error] Auth Error Occurred'
}

export class HttpError implements Action {
    readonly type = ErrorsActionTypes.HTTP_ERROR;

    constructor(public payload: string) {}
}

export class AuthError implements Action {
    readonly type = ErrorsActionTypes.AUTH_ERROR;

    constructor(public payload: string) {}
}

export type ErrorsActionsUnion = HttpError | AuthError;
