import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page.component';
import { SharedModule } from '../../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SmartLoginComponent } from './components/smart/smart-login.component';
import { RegisterPageComponent } from './pages/register-page.component';
import { SmartRegisterComponent } from './components/smart/smart-register.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AuthSketchComponent } from './components/auth-sketch/auth-sketch.component';

@NgModule({
    declarations: [
        LoginPageComponent,
        RegisterPageComponent,
        SmartLoginComponent,
        SmartRegisterComponent,
        LoginFormComponent,
        RegisterFormComponent,
        AuthSketchComponent
    ],
    imports: [CommonModule, AuthRoutingModule, SharedModule]
})
export class AuthModule {}
