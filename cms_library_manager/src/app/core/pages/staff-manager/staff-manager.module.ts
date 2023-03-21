import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {StaffManagerListComponent} from "./staff-manager-list/staff-manager-list.component";
import {StaffManagerRoutingModule} from "./staff-manager-routing.module";
import {TableModule} from "primeng/table";
import {SkeletonCustomModule} from "../../../util/skeleton/skeleton-custom.module";
import {SkeletonModule} from "primeng/skeleton";
import {AutoCompleteModule} from "primeng/autocomplete";


@NgModule({
  declarations: [
    StaffManagerListComponent
  ],

    imports: [
        CommonModule,
        StaffManagerRoutingModule,
        ReactiveFormsModule,
        ToastModule,
        TableModule,
        FormsModule,
        SkeletonModule,
        SkeletonCustomModule,
        AutoCompleteModule
    ],

  providers: [
    MessageService
  ]
})

export class StaffManagerModule { }
