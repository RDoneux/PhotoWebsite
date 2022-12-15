import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { Message } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private httpClient: HttpClient,
    private authorisationService: AuthorisationService
  ) {}

  async postMessage(message: Message) {
    const authToken = await this.authorisationService.getBearerToken();

    return this.httpClient.post('api/messages', message, {
      headers: new HttpHeaders({
        Authorization: authToken,
      }),
    });
  }
}
