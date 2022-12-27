import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSliderComponent } from './image-slider.component';
import { ImageSliderImageComponent } from './image-slider-image/image-slider-image.component';

@NgModule({
  declarations: [ImageSliderComponent, ImageSliderImageComponent],
  imports: [CommonModule],
  exports: [ImageSliderComponent],
})
export class ImageSliderModule {}
