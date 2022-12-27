import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { NavBarModule } from 'src/app/user-interface/nav-bar/nav-bar.module';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { ImageSliderModule } from 'src/app/common/image-slider/image-slider.module';


@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    NavBarModule,
    PageTitleModule,
    ImageSliderModule
  ]
})
export class GalleryModule { }
