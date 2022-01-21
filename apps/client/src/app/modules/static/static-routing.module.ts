import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyPageComponent } from './company/company-page.component';
import { CookiesPageComponent } from './cookies/cookies-page.component';
import { PrivacyPageComponent } from './privacy/privacy-page.component';
import { TosPageComponent } from './tos/tos-page.component';

const routes: Routes = [
    {
        path: 'company',
        component: CompanyPageComponent
    },
    {
        path: 'cookies',
        component: CookiesPageComponent
    },
    {
        path: 'privacy',
        component: PrivacyPageComponent
    },
    {
        path: 'tos',
        component: TosPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaticRoutingModule {}
