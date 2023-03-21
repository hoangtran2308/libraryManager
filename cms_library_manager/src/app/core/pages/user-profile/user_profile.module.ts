import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

import {TableModule} from "primeng/table";
import {UserProfileListComponent} from "./user-profile-list/user-profile-list.component";
import {UserProfileRoutingModule} from "./user_profile_routing.module";
import {CarouselModule} from "primeng/carousel";




@NgModule({
  declarations: [
    UserProfileListComponent
  ],

  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    FormsModule,
    CarouselModule
  ],

  providers: [
    MessageService
  ]
})

export class UserProfileModule { }
