import { Action } from '@ngrx/store';
import Alert from '../../models/alert.model';

export enum AlertActionTypes {
    ALERT_OPEN = '[Alert] Open',
    ALERT_CLOSE = '[Alert] Close'
}

export class AlertOpen implements Action {
    readonly type = AlertActionTypes.ALERT_OPEN;

    constructor(public payload: Alert) {}
}

export class AlertClose implements Action {
    readonly type = AlertActionTypes.ALERT_CLOSE;
}
