import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
  @Input() id: string | undefined = undefined;
  @Input() imageUrl: string | undefined = undefined;
  @Input() title: string | undefined = undefined;
  @Input() imageCount: number | undefined = undefined;

  constructor(private router: Router) {}

  navigateToCollectionGallery() {
    this.router.navigate(['/gallery'], { queryParams: { id: this.id } });
  }
}
