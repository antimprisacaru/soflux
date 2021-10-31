import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoginGuard } from './shared/guards/login.guard';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
        canActivate: [LoginGuard]
    },
    {
        path: 'not-found',
        component: PageNotFoundComponent
    },
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })]
})
export class AppRoutingModule {}
