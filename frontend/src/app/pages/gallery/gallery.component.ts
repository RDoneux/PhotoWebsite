import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { Image } from './gallery.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {

  images: Image[] | undefined = undefined;

  constructor(
    private activiatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private authorisationService: AuthorisationService
  ) {}

  async ngOnInit() {
      this.activiatedRoute.queryParams.subscribe({
        next: async (response) => {
          const id = response['id'];
          const authToken = await this.authorisationService.getBearerToken();
          this.httpClient
            .get(`api/collections/${id}/images`, {
              headers: { Authorization: authToken },
            })
            .subscribe({
              next: (response: any) => {
                this.images = response.data.images;
              },
            });
        },
      });
  }
}
