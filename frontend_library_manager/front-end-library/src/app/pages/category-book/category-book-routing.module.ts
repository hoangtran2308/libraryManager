import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {CategoryBookListComponent} from "./category-book-list/category-book-list.component";


const categoryBookRoutingModule: Routes = [
  {
    path: '',
    component: CategoryBookListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(categoryBookRoutingModule)],
  exports: [RouterModule]
})

export class CategoryBookRoutingModule { }
