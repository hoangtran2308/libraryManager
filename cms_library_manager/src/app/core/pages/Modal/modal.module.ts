import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {TableModule} from "primeng/table";
import {ChangPasswordComponent} from "./chang-password/chang-password.component";

@NgModule({
  declarations: [
    ChangPasswordComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule
  ],
  exports: [
    ChangPasswordComponent
  ],
  providers: [
    MessageService,
  ]
})

export class ModalModule { }
