import {NgModule} from "@angular/core";
import {DetailBookListComponent} from "./detail-book-list/detail-book-list.component";
import {DetailBookRoutingModule} from "./detail-book-routing.module";
import {LayoutModule} from "../layout/layout.module";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {CarouselModule} from 'primeng/carousel';
import {SkeletonModule} from "primeng/skeleton";
import {SkeletonCustomModule} from "../../util/skeleton/skeleton-custom.module";

@NgModule({
  declarations: [
    DetailBookListComponent
  ],
  imports: [
    DetailBookRoutingModule,
    LayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    CarouselModule,
    SkeletonModule,
    SkeletonCustomModule
  ],
  providers:   [
    FormBuilder,
    MessageService,
  ]
})

export class DetailBookModule {}
