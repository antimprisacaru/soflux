import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { State } from '../../state';
import User from '../models/user.model';

export async function getUserFromStateOrAPI(store$: Store<State>, authService: AuthService): Promise<User | void> {
    // const user = await store$
    //   .pipe(
    //     select((state) => state.userState.user),
    //     take(1)
    //   )
    //   .toPromise();
    // if (user) {
    //   return user;
    // }
    return await authService.getUser();
}
