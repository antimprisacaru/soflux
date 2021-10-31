import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../state';
import { selectUser } from '../../../modules/auth/state/auth.reducer';
import { LogoutUser } from '../../../modules/auth/state/auth.actions';
import User from '../../../shared/models/user.model';

@Component({
    selector: 'app-smart-header',
    template: `<app-header [user]="user$ | async" (logout)="logout()"></app-header>`
})
export class SmartHeaderComponent implements OnInit {
    user$: Observable<User>;

    constructor(private store: Store<State>) {}

    ngOnInit(): void {
        this.user$ = this.store.select(selectUser());
    }

    logout(): void {
        this.store.dispatch(new LogoutUser());
    }
}
