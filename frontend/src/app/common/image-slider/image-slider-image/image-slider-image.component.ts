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
export class ImageSliderImageComponent implements OnInit {
  @Input() src: string | undefined = undefined;
  @Input() index: number | undefined = undefined;
  @Input() targetImageIndex: number | undefined = undefined;

  @Output() clicked: EventEmitter<GalleryOffsetInformation> =
    new EventEmitter();

  @ViewChild('galleryImage') galleryImage: ElementRef | undefined = undefined;

  imageStatus: 'primary' | 'secondary' | 'terchary' = 'terchary';

  ngOnInit(): void {
    // if (!this.index || !this.targetImageIndex) return;
    // if (this.index === this.targetImageIndex) {
    //   this.imageStatus = 'primary';
    // } else if (
    //   this.index === this.targetImageIndex - 1 ||
    //   this.index === this.targetImageIndex + 1
    // ) {
    //   this.imageStatus = 'secondary';
    // }
  }

  onClick() {
    console.log(this.index, ' @ ', this.galleryImage);

    // if (!this.index || !this.galleryImage) {
    //   console.error('index or width is undefined');
    //   return;
    // }
    this.clicked.emit({
      index: this.index ?? 0,
      width: this.galleryImage?.nativeElement.width,
    });
  }
}
