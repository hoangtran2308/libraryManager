import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PublishingCompanyListComponent} from "./publishing-company-list/publishing-company-list.component";

const routes: Routes = [
  {
    path: '',
    component: PublishingCompanyListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublishingCompanyRoutingModule { }
