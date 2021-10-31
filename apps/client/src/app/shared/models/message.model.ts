import { AlertType } from './alert.model';

export default class Message {
    constructor(public message: string, public alertType: AlertType) {}
}
