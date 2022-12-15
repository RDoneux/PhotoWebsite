import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AboutService } from './about.service';
import { of } from 'rxjs';

describe('AboutService', () => {
  let service: AboutService;
  let httpClientMock: any = { get: () => {} };
  let authorisationServiceMock: any = { getBearerToken: () => {} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthorisationService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: AuthorisationService, useValue: authorisationServiceMock },
      ],
    });
    service = TestBed.inject(AboutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get user data', () => {
    it('should make api call for user details', async () => {
      spyOn(httpClientMock, 'get').and.returnValue(of('test-token'));
      spyOn(authorisationServiceMock, 'getBearerToken').and.returnValue(
        of('token')
      );
      await service.getUserData();
      expect(authorisationServiceMock.getBearerToken).toHaveBeenCalled();
      expect(httpClientMock.get).toHaveBeenCalled();
    });
  });
});
