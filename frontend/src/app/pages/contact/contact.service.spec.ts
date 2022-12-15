import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { Message } from './contact.model';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: any = { post: () => {} };
  let authorisationServiceMock: any = { getBearerToken: () => {} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpMock },
        { provide: AuthorisationService, useValue: authorisationServiceMock },
      ],
    });
    service = TestBed.inject(ContactService);
    spyOn(httpMock, 'post').and.returnValue(
      of({
        data: { status: 201, message: 'test-response' },
      })
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('post message', () => {
    it('should send message with correct body', async () => {
      const message: Message = {
        contact_email: 'test-contact-email',
        subject: 'test-subject',
        message: 'test-message',
      };

      spyOn(authorisationServiceMock, 'getBearerToken').and.returnValue(
        'value'
      );
      const postMessage = await service.postMessage(message);
      postMessage.subscribe({
        next: (response: any) => {
          expect(response.data.status).toBe(201);
          expect(response.data.message).toEqual('test-response');
        },
      });
      expect(httpMock.post).toHaveBeenCalled();
      expect(authorisationServiceMock.getBearerToken).toHaveBeenCalled();
    });
  });
});
