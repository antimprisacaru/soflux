import { Component, EventEmitter, Input, Output } from '@angular/core';
import { countries } from '../../../../shared/countries';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent {
    @Input() userProfileForm: FormGroup;
    @Output() saveProfile = new EventEmitter<void>();
    countriesArray: { name: string; code: string }[] = countries;
}
