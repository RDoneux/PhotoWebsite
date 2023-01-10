import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorisationService } from 'src/app/services/authorisation.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  @Input() id: string | undefined = undefined;
  @Input() imageId: string | undefined = undefined;
  @Input() title: string | undefined = undefined;
  @Input() imageCount: number | undefined = undefined;

  coverUrl: string = '';

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private authService: AuthorisationService
  ) {}

  async ngOnInit() {
    const authToken = await this.authService.getBearerToken();
    this.httpClient
      .get(`api/images/id/${this.imageId}`, {
        headers: { authorization: authToken },
      })
      .subscribe({
        next: (response:any) => {
          this.coverUrl = response.data.url
        },
      });
  }

  navigateToCollectionGallery() {
    this.router.navigate(['/gallery'], { queryParams: { id: this.id } });
  }
}
