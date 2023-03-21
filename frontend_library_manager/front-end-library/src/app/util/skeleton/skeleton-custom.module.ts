import {NgModule} from "@angular/core";
import {SkeletonModule} from "primeng/skeleton";
import {CategoryPageSkeletonComponent} from "./category-page-skeleton/category-page-skeleton.component";
import { HomePageSkeletonComponent } from './home-page-skeleton/home-page-skeleton.component';
import { UserProfileSkeletonComponent } from './user-profile-skeleton/user-profile-skeleton.component';
import {DetailBookSkeletonComponent} from "./detail-book-skeleton/detail-book-skeleton.component";
import { HomePageCategoryComponent } from './home-page-category/home-page-category.component';
import {NgForOf} from "@angular/common";

@NgModule({
  declarations: [
    CategoryPageSkeletonComponent,
    HomePageSkeletonComponent,
    UserProfileSkeletonComponent,
    DetailBookSkeletonComponent,
    UserProfileSkeletonComponent,
    HomePageCategoryComponent
  ],
  imports: [SkeletonModule, NgForOf],
  exports: [
    CategoryPageSkeletonComponent,
    HomePageSkeletonComponent,
    UserProfileSkeletonComponent,
    DetailBookSkeletonComponent,
    HomePageCategoryComponent
  ]
})

export class SkeletonCustomModule { }
