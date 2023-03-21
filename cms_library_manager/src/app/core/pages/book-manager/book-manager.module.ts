import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {BookManagerListComponent} from "./book-manager-list/book-manager-list.component";
import {BookManagerRoutingModule} from "./book-manager-routing.module";
import {TableModule} from "primeng/table";
import {SkeletonModule} from "primeng/skeleton";
import {SkeletonCustomModule} from "../../../util/skeleton/skeleton-custom.module";
import {PaginatorModule} from "primeng/paginator";
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";


@NgModule({
  declarations: [
    BookManagerListComponent
  ],

    imports: [
        CommonModule,
        BookManagerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        TableModule,
        SkeletonModule,
        SkeletonCustomModule,
        PaginatorModule,
        AutoCompleteModule,
      DropdownModule
    ],
  providers: [
    FormBuilder,
    MessageService
  ]
})

export class AuthorManagerModule { }
