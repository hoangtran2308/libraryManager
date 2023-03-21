import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {BookBorrowedListComponent} from "./book-borrowed-list/book-borrowed-list.component";



const bookBorrowedRoutingModule: Routes = [
  {
    path: '',
    component: BookBorrowedListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(bookBorrowedRoutingModule)],
  exports: [RouterModule]
})

export class  BookBorrowedRoutingModule { }
