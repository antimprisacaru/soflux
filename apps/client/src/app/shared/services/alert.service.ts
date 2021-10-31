import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';
import Message from '../models/message.model';
import { AlertType } from '../models/alert.model';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private messages: Message[] = [];
    messagesSubject$: BehaviorSubject<Message[]> = new BehaviorSubject([]);

    private static logToConsole(message: string): void {
        console.error(message);
    }

    add(message: string, alertType: AlertType): AlertService {
        this.messages.push(new Message(message, alertType));
        this.messagesSubject$.next(this.messages);
        return this;
    }

    clearLast(): void {
        this.clear(this.messages.length - 1);
    }

    clear(i: number, count: number = 1): void {
        this.messages.splice(i, count);
        this.messagesSubject$.next(this.messages);
    }

    clearAll(): void {
        this.messages = [];
    }

    public handleError<T>(): any {
        return (error: any): Observable<T> => {
            const data: any = error.error;
            typeof error.error === 'string' ? AlertService.logToConsole(data) : this.log(data.message);
            return of(data as T);
        };
    }

    private log(message: string): void {
        this.add(message, AlertType.ERROR);
        this.timeout(2000).then(() => this.clearAll());
    }

    private timeout(ms): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
