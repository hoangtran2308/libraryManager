import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {DetailBookListComponent} from "./detail-book-list/detail-book-list.component";



const detailBookRoutingModule: Routes = [
  {
    path: '',
    component: DetailBookListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(detailBookRoutingModule)],
  exports: [RouterModule]
})

export class  DetailBookRoutingModule { }
