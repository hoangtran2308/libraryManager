import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthorManagerListComponent} from "./author-manager-list/author-manager-list.component";


const routes: Routes = [
  {
    path: '',
    component: AuthorManagerListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthorManagerRoutingModule { }
