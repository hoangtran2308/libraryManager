import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AccManagerListComponent} from "./acc-manager-list/acc-manager-list.component";


const routes: Routes = [
  {
    path: '',
    component: AccManagerListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccManagerRoutingModule { }
