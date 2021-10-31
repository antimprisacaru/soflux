import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { selectUser } from '../../../auth/state/auth.reducer';
import { SaveUserProfile } from '../../state/settings.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-smart-settings',
    template: ` <app-settings-tabs [userProfileForm]="userProfileForm" (saveProfile)="saveProfile()"></app-settings-tabs> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartSettingsComponent implements OnInit, OnDestroy {
    userProfileForm: FormGroup;
    subscriptions: Subscription[] = [];

    constructor(private store: Store<State>, private fb: FormBuilder) {
        this.userProfileForm = this.fb.group({
            firstName: this.fb.control(''),
            lastName: this.fb.control(''),
            website: this.fb.control(''),
            about: this.fb.control(''),
            country: this.fb.control(''),
            street: this.fb.control(''),
            city: this.fb.control(''),
            state: this.fb.control(''),
            zip: this.fb.control('')
        });
    }

    ngOnInit(): void {
        this.subscriptions.push(this.store.select(selectUser()).subscribe(user => this.userProfileForm.patchValue(user)));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    saveProfile(): void {
        this.store.dispatch(new SaveUserProfile(this.userProfileForm.value));
    }

    addInstagramAccount(): void {
      return undefined;
    }
}
