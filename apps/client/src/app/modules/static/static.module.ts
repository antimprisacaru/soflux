import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticRoutingModule } from './static-routing.module';
import { CompanyPageComponent } from './company/company-page.component';
import { CookiesPageComponent } from './cookies/cookies-page.component';
import { TosPageComponent } from './tos/tos-page.component';
import { PrivacyPageComponent } from './privacy/privacy-page.component';


@NgModule({
  declarations: [
    CompanyPageComponent,
    CookiesPageComponent,
    TosPageComponent,
    PrivacyPageComponent
  ],
  imports: [
    CommonModule,
    StaticRoutingModule
  ]
})
export class StaticModule { }
