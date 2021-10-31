import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessengerPageComponent } from './page/messenger-page.component';

const routes: Routes = [{ path: '', component: MessengerPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessengerRoutingModule {}
