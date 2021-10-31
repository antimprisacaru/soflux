import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompaniesPageComponent } from './page/companies-page.component';

@NgModule({
    declarations: [CompaniesPageComponent],
    imports: [CommonModule, CompanyRoutingModule]
})
export class CompanyModule {}
