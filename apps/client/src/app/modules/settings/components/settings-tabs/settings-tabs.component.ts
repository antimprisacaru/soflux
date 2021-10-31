import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-settings-tabs',
    templateUrl: './settings-tabs.component.html',
    styleUrls: ['./settings-tabs.component.scss']
})
export class SettingsTabsComponent {
    @Input() userProfileForm: FormGroup;
    @Output() saveProfile = new EventEmitter<void>();
    openTab = 1;

    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }
}
