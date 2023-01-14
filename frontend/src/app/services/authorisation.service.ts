import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorisationService {
  authorisationBearerToken: string | undefined = undefined;

  constructor(private httpClient: HttpClient) {}
  requestAuthorisation() {
    this.httpClient.get('api/issue-token', {}).subscribe({
      next: (response: any) => {
        this.authorisationBearerToken = response.data;
      },
    });
  }

  updateBearerToken(authorisationBearerToken: string) {
    this.authorisationBearerToken = authorisationBearerToken;
  }

  async getBearerToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (this.authorisationBearerToken) {
          resolve('Bearer ' + this.authorisationBearerToken);
          clearTimeout(interval);
        }
      }, 100);
    });
  }
}
