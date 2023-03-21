import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {PagesRoutingModule} from "./pages-routing.module";
import { HomeComponent } from './home/home.component';
import {LayoutModule} from "./layout/layout.module";
import {CommonModule} from "@angular/common";
import {SkeletonModule} from "primeng/skeleton";
import {SkeletonCustomModule} from "../util/skeleton/skeleton-custom.module";


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        LayoutModule,
        SkeletonModule,
        SkeletonCustomModule
    ],
})

export class PagesModule {}
