import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketerRoutingModule } from './marketer-routing.module';
import { MarketerPageComponent } from './page/marketer-page.component';
import { SmartMarketerListComponent } from './component/smart/smart-marketer-list.component';
import { MarketerListComponent } from './component/marketer-list/marketer-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [MarketerPageComponent, SmartMarketerListComponent, MarketerListComponent],
    imports: [CommonModule, MarketerRoutingModule, SharedModule]
})
export class MarketerModule {}
