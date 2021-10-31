import { Action } from '@ngrx/store';
import SocialAccount from '../../../shared/models/social-account.model';
import { SocialPlatform } from '../../../shared/models/social-platform.model';
import User from '../../../shared/models/user.model';

export enum SettingsActionTypes {
    LOAD_SOCIAL_ACCOUNTS = '[Settings] Load Social Accounts',
    LOAD_SOCIAL_ACCOUNTS_SUCCESS = '[Settings] Load Social Accounts Success',
    SAVE_SOCIAL_ACCOUNT = '[Settings] Save Social Account',
    SAVE_SOCIAL_ACCOUNT_SUCCESS = '[Settings] Save Social Account Success',
    SAVE_USER_PROFILE = '[Settings] Save User Profile',
    SAVE_USER_PROFILE_SUCCESS = '[Settings] Save User Profile Success',
    EXCHANGE_INSTAGRAM_CODE_FOR_TOKEN = '[Settings] Exchange Instagram Code To Token'
}

export class LoadSocialAccount implements Action {
    readonly type = SettingsActionTypes.LOAD_SOCIAL_ACCOUNTS;
}

export class LoadSocialAccountSuccess implements Action {
    readonly type = SettingsActionTypes.LOAD_SOCIAL_ACCOUNTS_SUCCESS;

    constructor(public payload: SocialAccount[]) {}
}

export class SaveSocialAccount implements Action {
    readonly type = SettingsActionTypes.SAVE_SOCIAL_ACCOUNT;

    constructor(public payload: { accountId: string; key: string; platform: SocialPlatform }) {}
}

export class SaveSocialAccountSuccess implements Action {
    readonly type = SettingsActionTypes.SAVE_SOCIAL_ACCOUNT_SUCCESS;

    constructor(public payload: SocialAccount) {}
}

export class SaveUserProfile implements Action {
    readonly type = SettingsActionTypes.SAVE_USER_PROFILE;

    constructor(public payload: User) {}
}

export class SaveUserProfileSuccess implements Action {
    readonly type = SettingsActionTypes.SAVE_USER_PROFILE_SUCCESS;
}

export class ExchangeInstagramCodeForToken implements Action {
    readonly type = SettingsActionTypes.EXCHANGE_INSTAGRAM_CODE_FOR_TOKEN;

    constructor(public payload: string) {}
}

export type SettingsActionsUnion =
    | LoadSocialAccount
    | LoadSocialAccountSuccess
    | SaveSocialAccount
    | SaveSocialAccountSuccess
    | SaveUserProfile
    | SaveUserProfileSuccess
    | ExchangeInstagramCodeForToken;
