import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorisationService {
  authorisationBearerToken: string = '';

  constructor(private httpClient: HttpClient) {}
  requestAuthorisation() {
    this.httpClient.get('api/issue-token', {}).subscribe({
      next: (response: any) => {
        this.authorisationBearerToken = 'Bearer ' + response.data;
      },
    });
  }
}
