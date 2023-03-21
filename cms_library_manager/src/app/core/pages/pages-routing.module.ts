import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChartListComponent} from "./chart/chart-list.component";
import {AuthGuard} from "../../guards/auth-guard.service";

const pageRoutingModule: Routes = [
  {
    path: 'chart',
    canActivate: [AuthGuard],
    component: ChartListComponent
  },
  {
    path: '',
    redirectTo: 'chart',
    pathMatch: 'full',
  }
  ,
  {
    path: 'book-manager',
    canActivate: [AuthGuard],
    loadChildren: () => import('./book-manager/book-manager.module').then(module => module.AuthorManagerModule)
  },
  {
    path: 'acc-manager',
    canActivate: [AuthGuard],
    loadChildren: () => import('./acc-manager/acc-manager.module').then(module => module.AccManagerModule)
  },
  {
    path: 'staff-manager',
    canActivate: [AuthGuard],
    loadChildren: () => import('./staff-manager/staff-manager.module').then(module => module.StaffManagerModule)
  },
  {
    path: 'author-manager',
    canActivate: [AuthGuard],
    loadChildren: () => import('./author-manager/author-manager.module').then(module => module.AuthorManagerModule)
  },
  {
    path: 'loan-pay-manager',
    canActivate: [AuthGuard],
    loadChildren: () => import('./loan-pay-manager/loan-pay-manager.module').then(module => module.LoanPayManagerModule)
  },
  {
    path: 'category-manager',
    canActivate: [AuthGuard],
    loadChildren: () => import('./category-manager/category-manager.module').then(module => module.CategoryManagerModule)
  },
  {
    path: 'delinquent-manager',
    canActivate: [AuthGuard],
    loadChildren: () => import('./delinquent-manager/delinquent-manager.module').then(module => module.DelinquentManagerModule)
  },
  {
    path: 'publishing-company',
    canActivate: [AuthGuard],
    loadChildren: () => import('./publishing-company/publishing-company.module').then(module => module.PublishingCompanyModule)
  },
  {
    path: 'role-manager',
    canActivate: [AuthGuard],
    loadChildren: () => import('./role-manager/role-manager.module').then(module => module.RoleManagerModule)
  },
  {
    path: 'user-profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user-profile/user_profile.module').then(module => module.UserProfileModule)
  },
  {
    path: 'user-profile/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user-profile/user_profile.module').then(module => module.UserProfileModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(pageRoutingModule)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
