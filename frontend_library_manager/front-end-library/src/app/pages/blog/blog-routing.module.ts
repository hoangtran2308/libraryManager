import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {BlogListComponent} from "./blog-list/blog-list.component";
import {BlogDetailComponent} from "./blog-detail/blog-detail.component";


const blogRoutingModule: Routes = [
  {
    path: '',
    component: BlogListComponent
  },
  {
    path: 'blog-detail/:tag',
    component: BlogDetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(blogRoutingModule)],
  exports: [RouterModule]
})

export class BlogRoutingModule { }
