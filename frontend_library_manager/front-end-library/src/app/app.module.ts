import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PagesRoutingModule} from "./pages/pages-routing.module";
import {AuthInterceptor} from "../services/intercept/auth.interceptor";
import {FormBuilder} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PagesRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
