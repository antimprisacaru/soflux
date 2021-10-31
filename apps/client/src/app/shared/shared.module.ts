import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { InstagramApiWrapperService } from './services/instagram-api-wrapper.service';
import { MarketerCardComponent } from './components/marketer-card/marketer-card.component';
import { GraphQLService } from './services/graphql.service';
import { AlertListComponent } from './components/alert/alert-list.component';
import { EffectsModule } from '@ngrx/effects';
import { AlertEffects } from './components/alert/alert.effects';
import { AlertComponent } from './components/alert/alert.component';
import { SocialAccountsService } from './services/social-accounts.service';

@NgModule({
    declarations: [MarketerCardComponent, AlertListComponent, AlertComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, EffectsModule.forFeature([AlertEffects])],
    exports: [FormsModule, ReactiveFormsModule, MarketerCardComponent, AlertListComponent],
    providers: [AuthService, GraphQLService, InstagramApiWrapperService, SocialAccountsService]
})
export class SharedModule {}
