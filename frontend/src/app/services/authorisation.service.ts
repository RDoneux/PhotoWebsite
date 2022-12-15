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

  async getBearerToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      var count = 0;
      const interval = setInterval(() => {
        count++;
        if (this.authorisationBearerToken) {
          resolve('Bearer ' + this.authorisationBearerToken);
          clearTimeout(interval);
        }
        if (count > 1000) {
          clearTimeout(interval), reject();
        }
      }, 100);
    });
  }
}
