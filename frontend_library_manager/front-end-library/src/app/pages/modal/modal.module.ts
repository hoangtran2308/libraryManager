import {NgModule} from "@angular/core";
import {LayoutModule} from "../layout/layout.module";
import {CarouselModule} from "ngx-owl-carousel-o";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {TooltipModule} from "primeng/tooltip";



@NgModule({
  declarations: [
    ChangePasswordComponent,
  ],
  imports: [
    LayoutModule,
    CommonModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    CheckboxModule,
    InputTextModule,
    DialogModule,
    TooltipModule
  ],
  exports: [
    ChangePasswordComponent
  ],
  providers: [
    FormBuilder,
    MessageService
  ]
})

export class ModalModule {}
