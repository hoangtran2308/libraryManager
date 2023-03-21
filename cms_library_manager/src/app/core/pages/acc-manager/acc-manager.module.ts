import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AccManagerRoutingModule} from "./acc-manager-routing.module";
import {AccManagerListComponent} from "./acc-manager-list/acc-manager-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {SkeletonModule} from "primeng/skeleton";
import {SkeletonCustomModule} from "../../../util/skeleton/skeleton-custom.module";
import {AutoCompleteModule} from "primeng/autocomplete";


@NgModule({
  declarations: [
    AccManagerListComponent
  ],

  imports: [
    CommonModule,
    AccManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    PaginatorModule,
    TableModule,
    SkeletonModule,
    SkeletonCustomModule,
    AutoCompleteModule

  ],

  providers: [
    MessageService
  ]
})

export class AccManagerModule { }
