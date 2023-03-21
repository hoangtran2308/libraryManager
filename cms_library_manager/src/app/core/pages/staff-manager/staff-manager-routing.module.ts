import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StaffManagerListComponent} from "./staff-manager-list/staff-manager-list.component";

const routes: Routes = [
  {
    path: '',
    component: StaffManagerListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StaffManagerRoutingModule { }
