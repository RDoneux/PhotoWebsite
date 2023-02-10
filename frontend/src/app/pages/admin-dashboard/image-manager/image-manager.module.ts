import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageManagerRoutingModule } from './image-manager-routing.module';
import { ImageManagerComponent } from './image-manager.component';


@NgModule({
  declarations: [
    ImageManagerComponent
  ],
  imports: [
    CommonModule,
    ImageManagerRoutingModule
  ]
})
export class ImageManagerModule { }
