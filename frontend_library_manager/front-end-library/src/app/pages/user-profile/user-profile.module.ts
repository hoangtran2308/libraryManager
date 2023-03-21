import {NgModule} from "@angular/core";
import {LayoutModule} from "../layout/layout.module";
import {CarouselModule} from "ngx-owl-carousel-o";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {UserProfileListComponent} from "./user-profile-list/user-profile-list.component";
import {UserProfileRoutingModule} from "./user-profile-routing.module";
import {ModalModule} from "../modal/modal.module";
import {SkeletonModule} from "primeng/skeleton";
import {SkeletonCustomModule} from "../../util/skeleton/skeleton-custom.module";



@NgModule({
  declarations: [
    UserProfileListComponent
  ],
    imports: [
        UserProfileRoutingModule,
        LayoutModule,
        CommonModule,
        CarouselModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        ModalModule,

      SkeletonModule,
      SkeletonCustomModule
    ],
  providers:   [
    FormBuilder,
    MessageService
  ]
})

export class UserProfileModule {}
