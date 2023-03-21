import {NgModule} from "@angular/core";
import {BlogListComponent} from "./blog-list/blog-list.component";
import {BlogRoutingModule} from "./blog-routing.module";

import {LayoutModule} from "../layout/layout.module";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    BlogListComponent,
    BlogDetailComponent,



  ],
  exports: [
    BlogListComponent
  ],

    imports: [
      BlogRoutingModule,
      LayoutModule,
      CommonModule,
      ReactiveFormsModule,
      FormsModule,

    ]
})

export class BlogModule {}
