import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RoleManagerListComponent} from "./role-manager-list/role-manager-list.component";

const routes: Routes = [
  {
    path: '',
    component: RoleManagerListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoleManagerRoutingModule { }
