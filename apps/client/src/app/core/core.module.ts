import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { CoreComponent } from './core.component';
import { DashboardModule } from '../modules/dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { SmartHeaderComponent } from './components/smart-header/smart-header.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component';

@NgModule({
    declarations: [SmartHeaderComponent, HeaderComponent, FooterComponent, CoreComponent, NotificationsComponent, ProfileDropdownComponent],
    imports: [CommonModule, CoreRoutingModule, DashboardModule, RouterModule, SharedModule]
})
export class CoreModule {}
