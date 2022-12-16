import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
  @Input() imageUrl: string | undefined = undefined;
  @Input() title: string | undefined = undefined;
  @Input() imageCount: number | undefined = undefined;
}
