import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from './app.component';
import {NotFoundComponent} from "./core/not-found/not-found.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/intercept/auth.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormBuilder} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AuthGuard} from "./guards/auth-guard.service";

@NgModule({
  declarations: [
    NotFoundComponent,
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    FormBuilder,
    MessageService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
