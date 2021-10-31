import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state';
import { LoadUser } from './modules/auth/state/auth.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private store: Store<State>) {}

    ngOnInit(): void {
        this.store.dispatch(new LoadUser());
    }
}
