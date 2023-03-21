import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "./auth.component";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [
    FormBuilder
  ]
})
export class AuthModule {}
