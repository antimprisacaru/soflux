export enum AlertType {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error'
}

export default class Alert {
    message: string;
    type: AlertType;
}
