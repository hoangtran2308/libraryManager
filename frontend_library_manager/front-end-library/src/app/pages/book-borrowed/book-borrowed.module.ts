import {NgModule} from "@angular/core";
import {LayoutModule} from "../layout/layout.module";
import {CarouselModule} from "ngx-owl-carousel-o";
import {CommonModule} from "@angular/common";
import {BookBorrowedListComponent} from "./book-borrowed-list/book-borrowed-list.component";
import {BookBorrowedRoutingModule} from "./book-borrowed-routing.module";


@NgModule({
  declarations: [
    BookBorrowedListComponent
  ],
  imports: [
    BookBorrowedRoutingModule,
    LayoutModule,
    CommonModule,
    CarouselModule
  ]
})

export class BookBorrowedModule {}
