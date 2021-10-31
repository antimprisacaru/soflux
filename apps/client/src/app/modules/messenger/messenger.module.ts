import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessengerRoutingModule } from './messenger-routing.module';
import { MessengerPageComponent } from './page/messenger-page.component';

@NgModule({
    declarations: [MessengerPageComponent],
    imports: [CommonModule, MessengerRoutingModule]
})
export class MessengerModule {}
