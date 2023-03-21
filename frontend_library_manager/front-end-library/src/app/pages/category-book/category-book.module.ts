import {NgModule} from "@angular/core";
import {CategoryBookListComponent} from "./category-book-list/category-book-list.component";
import {CategoryBookRoutingModule} from "./category-book-routing.module";
import {CommonModule} from "@angular/common";
import {PaginatorModule} from 'primeng/paginator';
import {SkeletonModule} from "primeng/skeleton";
import {SkeletonCustomModule} from "../../util/skeleton/skeleton-custom.module";

@NgModule({
  declarations: [
    CategoryBookListComponent
  ],
  imports: [
    CommonModule,
    CategoryBookRoutingModule,
    PaginatorModule,
    SkeletonModule,
    SkeletonCustomModule
  ]
})

export class CategoryBookModule {}
