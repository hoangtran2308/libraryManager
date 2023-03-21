import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CategoryManagerListComponent} from "./category-manager-list/category-manager-list.component";
import {CategoryManagerRoutingModule} from "./category-manager-routing.module";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {TableModule} from "primeng/table";
import {SkeletonModule} from "primeng/skeleton";
import {SkeletonCustomModule} from "../../../util/skeleton/skeleton-custom.module";


@NgModule({
  declarations: [
    CategoryManagerListComponent
  ],

  imports: [
    CommonModule,
    CategoryManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    SkeletonModule,
    SkeletonCustomModule
  ],
  providers: [
    FormBuilder,
    MessageService
  ]
})

export class CategoryManagerModule { }
