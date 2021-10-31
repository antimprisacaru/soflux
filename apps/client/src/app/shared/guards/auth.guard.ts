import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserFromStateOrAPI } from './auth-guard-helper';
import { LoadUserSuccess } from '../../modules/auth/state/auth.actions';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { State } from '../../state';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store$: Store<State>, private router: Router, private authService: AuthService) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const user = await this.authService.getUser();

        if (user) {
            this.store$.dispatch(new LoadUserSuccess(user));
            return true;
        }
        setTimeout(() => this.router.navigate(['/auth/sign-in'], { skipLocationChange: true }));
        return false;
    }
}
