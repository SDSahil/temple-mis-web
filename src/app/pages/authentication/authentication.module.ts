import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationRoutes } from './authentication.routing';
import { AppErrorComponent } from './error/error.component';
import { AppSideForgotPasswordComponent } from './side-forgot-password/side-forgot-password.component';
import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';



@NgModule({
  declarations: [
    AppErrorComponent,
    AppSideForgotPasswordComponent,
    AppSideLoginComponent,
    AppSideRegisterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatPasswordStrengthModule,
    RouterModule.forChild(AuthenticationRoutes)
  ],
  providers: []
})
export class AuthenticationModule { }
