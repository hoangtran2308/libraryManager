import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {CarouselModule} from "primeng/carousel";
import { CarouselComponent } from './carousel/carousel.component';



@NgModule({
  declarations: [
   HeaderComponent,
    FooterComponent,
    CarouselComponent,

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule
  ]
})

export class LayoutModule {}
