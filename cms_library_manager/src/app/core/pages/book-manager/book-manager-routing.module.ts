import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BookManagerListComponent} from "./book-manager-list/book-manager-list.component";


const routes: Routes = [
  {
    path: '',
    component: BookManagerListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BookManagerRoutingModule { }
