import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorisationService } from 'src/app/services/authorisation.service';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(
    private httpClient: HttpClient,
    private authorisationService: AuthorisationService
  ) {}

  async getUserData() {
    const token = await this.authorisationService.getBearerToken();
    return this.httpClient.get('api/admin-dashboard/about', {
      headers: { Authorization: token },
    });
  }
}
