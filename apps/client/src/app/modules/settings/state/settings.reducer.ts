import { SettingsActionsUnion, SettingsActionTypes } from './settings.actions';
import { createFeatureSelector } from '@ngrx/store';
import { State } from '../../../state';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import SocialAccount from '../../../shared/models/social-account.model';

export interface SettingsState extends EntityState<SocialAccount> {
    loading: boolean;
}

const adapter: EntityAdapter<SocialAccount> = createEntityAdapter<SocialAccount>();

export const initialSettingsState: SettingsState = adapter.getInitialState({
    loading: false
});

export function settingsReducer(state: SettingsState = initialSettingsState, action: SettingsActionsUnion): SettingsState {
    switch (action.type) {
        case SettingsActionTypes.LOAD_SOCIAL_ACCOUNTS:
            return {
                ...state,
                loading: true
            };
        case SettingsActionTypes.LOAD_SOCIAL_ACCOUNTS_SUCCESS:
            return adapter.addMany(action.payload, { ...state, loading: false });
        case SettingsActionTypes.SAVE_SOCIAL_ACCOUNT:
            return {
                ...state,
                loading: true
            };
        case SettingsActionTypes.SAVE_SOCIAL_ACCOUNT_SUCCESS:
            return adapter.addOne(action.payload, { ...state, loading: false });
        default: {
            return state;
        }
    }
}

const selectSettingsState = createFeatureSelector<State, SettingsState>('settingsState');
