import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CategoryManagerListComponent} from "./category-manager-list/category-manager-list.component";


const routes: Routes = [
  {
    path: '',
    component: CategoryManagerListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoryManagerRoutingModule { }
