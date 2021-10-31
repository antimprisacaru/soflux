import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadUserSuccess } from '../../modules/auth/state/auth.actions';
import { AuthService } from '../services/auth.service';
import { State } from '../../state';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(private store$: Store<State>, private router: Router, private authService: AuthService) {}

    async canActivate(): Promise<boolean> {
        const user = await this.authService.getUser();
        if (user) {
            this.store$.dispatch(new LoadUserSuccess(user));
            setTimeout(() => this.router.navigate([''], { skipLocationChange: true }));
            return false;
        }
        return true;
    }
}
