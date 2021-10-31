import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { selectUserLoading } from '../modules/auth/state/auth.reducer';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-core',
    template: `
        <div class="flex flex-col h-full" *ngIf="(loading$ | async) === false">
            <header>
                <app-smart-header></app-smart-header>
            </header>
            <div id="content" class="p-8">
                <app-alert-list></app-alert-list>
                <router-outlet></router-outlet>
            </div>
            <footer class="w-full text-center p-4 pin-b">
                <app-footer></app-footer>
            </footer>
        </div>
    `
})
export class CoreComponent implements OnInit {
    loading$: Observable<boolean>;

    constructor(private store: Store<State>) {}

    ngOnInit(): void {
        this.loading$ = this.store.select(selectUserLoading());
    }
}
