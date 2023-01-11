  import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GalleryOffsetInformation } from '../image-slider.model';

@Component({
  selector: 'app-image-slider-image',
  templateUrl: './image-slider-image.component.html',
  styleUrls: ['./image-slider-image.component.scss'],
})
export class ImageSliderImageComponent {
  @Input() src: string | undefined = undefined;
  @Input() index: number | undefined = undefined;
  @Input() targetImageIndex: number | undefined = undefined;

  @Output() clicked: EventEmitter<GalleryOffsetInformation> =
    new EventEmitter();

  @ViewChild('galleryImage') galleryImage: ElementRef | undefined = undefined;

  imageStatus: 'primary' | 'secondary' | 'terchary' = 'terchary';

  onClick() {
    this.clicked.emit({
      index: this.index ?? 0,
      width: this.galleryImage?.nativeElement.width,
    });
  }
}
