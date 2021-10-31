import { Action } from '@ngrx/store';
import { RegistrationConfirmInput, UserLoginInput, UserRegisterInput } from '../../../shared/models/auth.model';
import User from '../../../shared/models/user.model';

export enum AuthActionTypes {
    USER_LOGIN = '[Auth] Login',
    USER_LOGIN_SUCCESS = '[Auth] Login Success',
    USER_REGISTER = '[Auth] Register',
    USER_REGISTER_SUCCESS = '[Auth] Register Success',
    USER_REGISTER_CONFIRM = '[Auth] Register Confirm',
    USER_REGISTER_CONFIRM_SUCCESS = '[Auth] Register Confirm Success',
    LOAD_USER = '[Auth] Load User',
    LOAD_USER_SUCCESS = '[Auth] Load User Success',
    LOGOUT_USER = '[Auth] Logout',
    LOGOUT_USER_SUCCESS = '[Auth] Logout Success'
}

export class UserLogin implements Action {
    readonly type = AuthActionTypes.USER_LOGIN;

    constructor(public payload: UserLoginInput) {}
}

export class UserLoginSuccess implements Action {
    readonly type = AuthActionTypes.USER_LOGIN_SUCCESS;
}

export class UserRegister implements Action {
    readonly type = AuthActionTypes.USER_REGISTER;

    constructor(public payload: UserRegisterInput) {}
}

export class UserRegisterSuccess implements Action {
    readonly type = AuthActionTypes.USER_REGISTER_SUCCESS;
}

export class UserRegisterConfirm implements Action {
    readonly type = AuthActionTypes.USER_REGISTER_CONFIRM;

    constructor(public payload: RegistrationConfirmInput) {}
}

export class UserRegisterConfirmSuccess implements Action {
    readonly type = AuthActionTypes.USER_REGISTER_CONFIRM_SUCCESS;
}

export class LoadUser implements Action {
    readonly type = AuthActionTypes.LOAD_USER;
}

export class LoadUserSuccess implements Action {
    readonly type = AuthActionTypes.LOAD_USER_SUCCESS;

    constructor(public payload: User) {}
}

export class LogoutUser implements Action {
    readonly type = AuthActionTypes.LOGOUT_USER;
}

export class LogoutUserSuccess implements Action {
    readonly type = AuthActionTypes.LOGOUT_USER_SUCCESS;
}

export type AuthActionsUnion =
    | UserLogin
    | UserLoginSuccess
    | UserRegister
    | UserRegisterSuccess
    | UserRegisterConfirm
    | UserRegisterConfirmSuccess
    | LoadUser
    | LoadUserSuccess
    | LogoutUser
    | LogoutUserSuccess;
