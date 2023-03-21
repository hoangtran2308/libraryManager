import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
// import * as module from "module";

const pagesRoutingModule: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'author',
    loadChildren: () => import('./author/author.module').then(module => module.AuthorModule)
  },
  {
    path: 'category-book',
    loadChildren: () => import('./category-book/category-book.module').then(module => module.CategoryBookModule)
  },
  {
    path: 'category-book/:id',
    loadChildren: () => import('./category-book/category-book.module').then(module => module.CategoryBookModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(module => module.ContactModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then(module => module.BlogModule)
  },
  {
    path: 'detail-book/:id',
    loadChildren: () => import('./detail-book/detail-book.module').then(module => module.DetailBookModule)
  },
  {
    path: 'book-borrowed',
    loadChildren: () => import('./book-borrowed/book-borrowed.module').then(module => module.BookBorrowedModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then(module => module.UserProfileModule)
  },
  {
    path: '',
    redirectTo: '/pages/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutingModule)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
