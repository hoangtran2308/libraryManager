import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {RoleManagerListComponent} from "./role-manager-list/role-manager-list.component";
import {RoleManagerRoutingModule} from "./role-manager-routing.module";
import {TableModule} from "primeng/table";
import {SkeletonModule} from "primeng/skeleton";
import {SkeletonCustomModule} from "../../../util/skeleton/skeleton-custom.module";


@NgModule({
  declarations: [
    RoleManagerListComponent
  ],

  imports: [
    CommonModule,
    RoleManagerRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    SkeletonModule,
    SkeletonCustomModule
  ],

  providers: [
    MessageService
  ]
})

export class RoleManagerModule { }
