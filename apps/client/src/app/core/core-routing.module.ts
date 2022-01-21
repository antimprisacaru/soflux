import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: CoreComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'marketers',
                loadChildren: () => import('../modules/marketer/marketer.module').then(m => m.MarketerModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'companies',
                loadChildren: () => import('../modules/company/company.module').then(m => m.CompanyModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'settings',
                loadChildren: () => import('../modules/settings/settings.module').then(m => m.SettingsModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'messenger',
                loadChildren: () => import('../modules/messenger/messenger.module').then(m => m.MessengerModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'static',
                loadChildren: () => import('../modules/static/static.module').then(m => m.StaticModule)
            },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {}
