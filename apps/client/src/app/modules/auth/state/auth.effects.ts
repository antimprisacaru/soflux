import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    AuthActionTypes,
    LoadUser,
    LoadUserFailure,
    LoadUserSuccess,
    LogoutUser,
    LogoutUserSuccess,
    UserLogin,
    UserLoginSuccess,
    UserRegister,
    UserRegisterConfirm,
    UserRegisterConfirmSuccess,
    UserRegisterSuccess
} from './auth.actions';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AlertOpen } from '../../../shared/components/alert/alert.actions';
import { AlertType } from '../../../shared/models/alert.model';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoadUser>(AuthActionTypes.LOAD_USER),
            switchMap(() =>
                this.authService
                    .getUser()
                    .then(res => new LoadUserSuccess(res))
                    .catch(() => new LoadUserFailure())
            )
        )
    );

    loadUserFailed$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType<LoadUserFailure>(AuthActionTypes.LOAD_USER_FAILURE),
                tap(() => localStorage.removeItem('authorization'))
            ),
        { dispatch: false }
    );

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UserLogin>(AuthActionTypes.USER_LOGIN),
            switchMap(action => this.authService.login(action.payload).then(() => new UserLoginSuccess()))
        )
    );

    loginUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UserLoginSuccess>(AuthActionTypes.USER_LOGIN_SUCCESS),
            tap(() => this.router.navigate(['/dashboard'])),
            map(() => new LoadUser())
        )
    );

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UserRegister>(AuthActionTypes.USER_REGISTER),
            switchMap(action => this.authService.signUp(action.payload).then(() => new UserRegisterSuccess()))
        )
    );

    registerUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UserRegisterSuccess>(AuthActionTypes.USER_REGISTER_SUCCESS),
            map(() => {
                setTimeout(() => this.router.navigate(['/auth/login']));
                return new AlertOpen({
                    message: 'Membership registration successful!',
                    type: AlertType.SUCCESS
                });
            })
        )
    );

    registerUserConfirm$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType<UserRegisterConfirm>(AuthActionTypes.USER_REGISTER_CONFIRM),
                map(action =>
                    this.authService.registerConfirm(action.payload).then(() => setTimeout(() => this.router.navigate(['/auth/login'])))
                )
            ),
        { dispatch: false }
    );

    registerUserConfirmSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UserRegisterConfirmSuccess>(AuthActionTypes.USER_REGISTER_CONFIRM_SUCCESS),
            map(() => {
                setTimeout(() => this.router.navigate(['/sign-in']));
                return new AlertOpen({
                    message: 'Your account is now verified!',
                    type: AlertType.SUCCESS
                });
            })
        )
    );

    logoutUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LogoutUser>(AuthActionTypes.LOGOUT_USER),
            switchMap(() => this.authService.logout().then(() => new LogoutUserSuccess()))
        )
    );

    logoutUserSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType<LogoutUserSuccess>(AuthActionTypes.LOGOUT_USER_SUCCESS),
                tap(async () => {
                    localStorage.removeItem('authorization');
                    return this.router.navigate(['/auth/login']);
                })
            ),
        { dispatch: false }
    );
}
