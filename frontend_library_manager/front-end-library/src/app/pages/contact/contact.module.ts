import {NgModule} from "@angular/core";
import {ContactListComponent} from "./contact-list/contact-list.component";
import {ContactRoutingModule} from "./contact-routing.module";
import {GMapModule} from "primeng/gmap";

@NgModule({
  declarations: [
    ContactListComponent
  ],
  imports: [
    ContactRoutingModule,
    GMapModule
  ]
})

export class ContactModule {}

