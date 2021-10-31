import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsPageComponent } from './pages/settings-page.component';
import { AddAccountPageComponent } from './pages/add-account-page.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsPageComponent
    },
    {
        path: 'add-account/:platform',
        children: [
            {
                path: '',
                component: AddAccountPageComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {}
