import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {AuthComponent} from "./auth.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AuthComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    MessagesModule,
    ProgressSpinnerModule
  ],
  providers:[
    MessageService,
    FormBuilder
  ]
})

export class AuthModule {

}


