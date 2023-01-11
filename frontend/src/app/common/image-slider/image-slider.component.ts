import { Component, Input } from '@angular/core';
import { Image } from 'src/app/pages/gallery/gallery.model';
import { GalleryOffsetInformation } from './image-slider.model';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
})
export class ImageSliderComponent {
  @Input() images: Image[] | undefined = undefined;

  targetImageIndex: number = 0;
  desiredRotation: number = 0;
  minImageNumber: number = 7;

  imageClicked(event: GalleryOffsetInformation) {
    if (!this.images) return;
    this.targetImageIndex = event.index;
    this.desiredRotation =
      -(
        360 /
        (this.images.length + 2 <= this.minImageNumber
          ? this.minImageNumber
          : this.images.length + 2)
      ) * event.index;
  }
}
