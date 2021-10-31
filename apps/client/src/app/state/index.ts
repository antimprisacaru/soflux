import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { userReducer, UserState } from '../modules/auth/state/auth.reducer';
import { settingsReducer, SettingsState } from '../modules/settings/state/settings.reducer';

export interface State {
    userState: UserState;
    settingsState: SettingsState;
}

export const reducers: ActionReducerMap<State> = {
    userState: userReducer,
    settingsState: settingsReducer
};

export const metaReducers: MetaReducer<State>[] = [];
