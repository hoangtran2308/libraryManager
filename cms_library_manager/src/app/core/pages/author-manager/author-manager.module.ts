import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthorManagerListComponent} from "./author-manager-list/author-manager-list.component";
import {AuthorManagerRoutingModule} from "./author-manager-routing.module";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {TableModule} from "primeng/table";
import {GMapModule} from "primeng/gmap";
import {SkeletonModule} from "primeng/skeleton";
import {SkeletonCustomModule} from "../../../util/skeleton/skeleton-custom.module";
import {AutoCompleteModule} from "primeng/autocomplete";


@NgModule({
  declarations: [
    AuthorManagerListComponent
  ],

  imports: [
    CommonModule,
    AuthorManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    SkeletonModule,
    SkeletonCustomModule,
    AutoCompleteModule
  ],
  providers: [
    FormBuilder,
    MessageService
  ]
})

export class AuthorManagerModule { }
