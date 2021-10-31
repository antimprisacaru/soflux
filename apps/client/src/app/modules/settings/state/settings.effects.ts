import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { SaveUserProfile, SaveUserProfileSuccess, SettingsActionTypes } from './settings.actions';
import { InstagramApiWrapperService } from '../../../shared/services/instagram-api-wrapper.service';
import { SettingsService } from '../services/settings.service';
import { LoadUser } from '../../auth/state/auth.actions';
import { AlertOpen } from '../../../shared/components/alert/alert.actions';
import { AlertType } from '../../../shared/models/alert.model';
import { Store } from '@ngrx/store';
import { State } from '../../../state';
import { selectUser } from '../../auth/state/auth.reducer';

@Injectable()
export class SettingsEffects {
    constructor(
        private store: Store<State>,
        private actions$: Actions,
        private settingsService: SettingsService,
        private instagramApiWrapperService: InstagramApiWrapperService
    ) {}

    // @Effect()
    // saveSocialAccount$ = this.actions$.pipe(
    //   ofType<SaveSocialAccount>(SettingsActionTypes.SAVE_SOCIAL_ACCOUNT),
    //   map((action) => {
    //     if (action.payload.platform === SocialPlatform.INSTAGRAM) {
    //       return this.instagramApiWrapperService
    //         .saveUserAccount(action.payload.accountId, action.payload.key)
    //         .then(() => new SaveSocialAccountSuccess(null))
    //         .catch((e: HttpErrorResponse) => new HttpError(e.message));
    //     } else {
    //       return new HttpError('An error has occurred!');
    //     }
    //   })
    // );

    // @Effect()
    // authenticateInstagramUser$ = this.actions$.pipe(
    //   ofType<ExchangeInstagramCodeForToken>(
    //     SettingsActionTypes.EXCHANGE_INSTAGRAM_CODE_FOR_TOKEN
    //   ),
    //   switchMap((action) =>
    //     this.instagramApiWrapperService.exchangeCodeForToken(action.payload)
    //   ),
    //   map(
    //     (result: { access_token: string; user_id: string }) =>
    //       new SaveSocialAccount({
    //         accountId: result.user_id,
    //         key: result.access_token,
    //         platform: SocialPlatform.INSTAGRAM,
    //       })
    //   )
    // );

    saveProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType<SaveUserProfile>(SettingsActionTypes.SAVE_USER_PROFILE),
            withLatestFrom(this.store.select(selectUser())),
            switchMap(([action, user]) =>
                this.settingsService.updateUser({ ...action.payload, id: user.id }).then(() => new SaveUserProfileSuccess())
            )
        )
    );

    saveProfileSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType<SaveUserProfileSuccess>(SettingsActionTypes.SAVE_USER_PROFILE_SUCCESS),
            mergeMap(() => [
                new LoadUser(),
                new AlertOpen({
                    message: 'Profile saved successfully!',
                    type: AlertType.SUCCESS
                })
            ])
        )
    );
}
