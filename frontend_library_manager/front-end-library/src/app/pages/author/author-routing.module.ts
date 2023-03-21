import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AuthorListComponent} from "./author-list/author-list.component";


const authorRoutingModule: Routes = [
  {
    path: '',
    component: AuthorListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(authorRoutingModule)],
  exports: [RouterModule]
})

export class AuthorRoutingModule { }
