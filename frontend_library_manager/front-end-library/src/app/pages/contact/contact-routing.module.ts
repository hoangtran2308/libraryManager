import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ContactListComponent} from "./contact-list/contact-list.component";


const contactRoutingModule: Routes = [
  {
    path: '',
    component: ContactListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(contactRoutingModule)],
  exports: [RouterModule]
})

export class ContactRoutingModule { }
