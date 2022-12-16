import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorisationService } from 'src/app/services/authorisation.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {

  constructor(
    private httpClient: HttpClient,
    private authorisationService: AuthorisationService
  ) {}

  async getCollections() {
    const authToken = await this.authorisationService.getBearerToken();
    return this.httpClient.get('api/collections', {
      headers: { Authorization: authToken },
    });
  }
}
