import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {UserProfileListComponent} from "./user-profile-list/user-profile-list.component";



const userProfileRoutingModule: Routes = [
  {
    path: '',
    component: UserProfileListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(userProfileRoutingModule)],
  exports: [RouterModule]
})

export class  UserProfileRoutingModule { }
