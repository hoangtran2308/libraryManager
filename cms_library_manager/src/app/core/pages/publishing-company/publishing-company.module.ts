import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PublishingCompanyListComponent} from "./publishing-company-list/publishing-company-list.component";
import {PublishingCompanyRoutingModule} from "./publishing-company-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {TableModule} from "primeng/table";
import {SkeletonModule} from "primeng/skeleton";
import {SkeletonCustomModule} from "../../../util/skeleton/skeleton-custom.module";


@NgModule({
  declarations: [
    PublishingCompanyListComponent
  ],

    imports: [
      CommonModule,
      PublishingCompanyRoutingModule,
      ReactiveFormsModule,
      ToastModule,
      TableModule,
      FormsModule,
      SkeletonModule,
      SkeletonCustomModule
    ],

  providers: [
    MessageService
  ]
})

export class PublishingCompanyModule { }
