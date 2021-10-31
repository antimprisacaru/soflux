import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketerPageComponent } from './page/marketer-page.component';

const routes: Routes = [{ path: '', component: MarketerPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MarketerRoutingModule {}
