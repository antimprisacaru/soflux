import * as fromAuth from './auth.reducer';
import * as fromActions from './auth.actions';

describe('Auth Reducer Tests', () => {
    describe('undefined action', () => {
        it('Should return the default state', () => {
            const { initialUserState } = fromAuth;
            const action: fromActions.AuthActionsUnion = {} as any;
            const state = fromAuth.userReducer(undefined, action);

            expect(state).toBe(initialUserState);
        });
    });

    describe('login action', () => {
        it('should set loading to true', () => {
            const { initialUserState } = fromAuth;
            const action = new fromActions.UserLogin({
                email: 'asd',
                password: 'asd'
            });
            const state = fromAuth.userReducer(initialUserState, action);

            expect(state.loading).toBe(true);
        });

        it('should set user state on success', () => {
            const expectedState: fromAuth.UserState = {
                loading: false,
                initialLoading: false,
                user: null
            };
            const { initialUserState } = fromAuth;
            const action = new fromActions.UserLoginSuccess();
            const state = fromAuth.userReducer(initialUserState, action);
            expect(state).toEqual(expectedState);
        });
    });
});
