import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DelinquentManagerListComponent} from "./delinquent-manager-list/delinquent-manager-list.component";


const routes: Routes = [
  {
    path: '',
    component: DelinquentManagerListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DelinquentManagerRoutingModule { }
