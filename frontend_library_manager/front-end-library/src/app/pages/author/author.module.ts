import {NgModule} from "@angular/core";
import {AuthorListComponent} from "./author-list/author-list.component";
import {AuthorRoutingModule} from "./author-routing.module";


@NgModule({
  declarations: [
    AuthorListComponent
  ],
  imports: [
    AuthorRoutingModule
  ]
})

export class AuthorModule {}
