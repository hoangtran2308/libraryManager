import {NgModule} from "@angular/core";
import {SkeletonModule} from "primeng/skeleton";
import {BookManagerSkeletonComponent} from "./book-manager-skeleton/book-manager-skeleton.component";
import { AccManagerSkeletonComponent } from './acc-manager-skeleton/acc-manager-skeleton.component';
import { AuthorManagerSkeletonComponent } from './author-manager-skeleton/author-manager-skeleton.component';
import { CategoryManagerSkeletonComponent } from './category-manager-skeleton/category-manager-skeleton.component';
import { DelinquentSkeletonComponent } from './delinquent-skeleton/delinquent-skeleton.component';
import { LoanPaySkeletonComponent } from './loan-pay-skeleton/loan-pay-skeleton.component';
import { PublishingSkeletonComponent } from './publishing-skeleton/publishing-skeleton.component';
import { RoleSkeletonComponent } from './role-skeleton/role-skeleton.component';
import { StaffSkeletonComponent } from './staff-skeleton/staff-skeleton.component';
import {NgForOf} from "@angular/common";

@NgModule({
  declarations: [
    BookManagerSkeletonComponent,
    AccManagerSkeletonComponent,
    AuthorManagerSkeletonComponent,
    CategoryManagerSkeletonComponent,
    DelinquentSkeletonComponent,
    LoanPaySkeletonComponent,
    PublishingSkeletonComponent,
    RoleSkeletonComponent,
    StaffSkeletonComponent
  ],
  imports: [SkeletonModule, NgForOf],
    exports: [
        BookManagerSkeletonComponent,
        AccManagerSkeletonComponent,
        AuthorManagerSkeletonComponent,
        StaffSkeletonComponent,
        CategoryManagerSkeletonComponent,
        PublishingSkeletonComponent,
        LoanPaySkeletonComponent,
        DelinquentSkeletonComponent,
        RoleSkeletonComponent
    ]
})

export class SkeletonCustomModule { }
