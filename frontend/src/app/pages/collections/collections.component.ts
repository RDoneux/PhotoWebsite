import { Component, OnInit } from '@angular/core';
import { CollectionsService } from './collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {
  collections: any;

  constructor(private service: CollectionsService) {}

  async ngOnInit() {
    const collectionsRequest = await this.service.getCollections();
    collectionsRequest.subscribe({
      next: (response: any) => {
        this.collections = response.data;
      },
    });
  }
}
