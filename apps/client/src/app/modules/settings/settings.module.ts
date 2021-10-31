import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsPageComponent } from './pages/settings-page.component';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from './state/settings.effects';
import { SmartSettingsComponent } from './components/smart/smart-settings.component';
import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { SettingsTabsComponent } from './components/settings-tabs/settings-tabs.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { SettingsService } from './services/settings.service';
import { AddAccountPageComponent } from './pages/add-account-page.component';
import { SmartAddAccountComponent } from './components/smart/smart-add-account.component';

@NgModule({
    declarations: [
        SettingsPageComponent,
        AddAccountPageComponent,
        SmartSettingsComponent,
        SmartAddAccountComponent,
        AccountsTableComponent,
        SettingsTabsComponent,
        ChangePasswordComponent,
        ProfileSettingsComponent
    ],
    imports: [CommonModule, SettingsRoutingModule, SharedModule, EffectsModule.forFeature([SettingsEffects])],
    providers: [SettingsService]
})
export class SettingsModule {}
