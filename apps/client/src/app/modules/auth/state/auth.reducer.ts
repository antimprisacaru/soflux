import { AuthActionsUnion, AuthActionTypes } from './auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../../../state';
import User from '../../../shared/models/user.model';

export interface UserState {
    user: User;
    initialLoading: boolean;
    loading: boolean;
}

export const initialUserState: UserState = {
    user: null,
    initialLoading: true,
    loading: false
};

export function userReducer(state: UserState = initialUserState, action: AuthActionsUnion): UserState {
    switch (action.type) {
        case AuthActionTypes.USER_LOGIN: {
            return {
                ...state,
                loading: true,
                initialLoading: true
            };
        }
        case AuthActionTypes.USER_LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false
            };
        }
        case AuthActionTypes.LOAD_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                initialLoading: false
            };
        }
        case AuthActionTypes.LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                user: null
            };
        }
        default: {
            return state;
        }
    }
}

const selectUserState = createFeatureSelector<State, UserState>('userState');

export const selectUser = () => createSelector(selectUserState, state => state.user);

export const selectUserLoading = () => createSelector(selectUserState, state => state.loading || state.initialLoading);
