import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoanPayManagerListComponent} from "./loan-pay-manager-list/loan-pay-manager-list.component";

const routes: Routes = [
  {
    path: '',
    component: LoanPayManagerListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoanPayManagerRoutingModule { }
