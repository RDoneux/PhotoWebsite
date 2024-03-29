import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthorisationService } from './authorisation.service';

describe('AuthorisationService', () => {
  let service: AuthorisationService;
  let httpMock: any = { get: () => {} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpMock }],
    });
    service = TestBed.inject(AuthorisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('constructor', () => {
    it('should get request token', () => {
      spyOn(httpMock, 'get').and.returnValue(of({ data: 'test-auth-token' }));
      service.requestAuthorisation();

      expect(httpMock.get).toHaveBeenCalledWith('api/issue-token', {});
      expect(service.authorisationBearerToken).toEqual('test-auth-token');
    });
  });

  describe('get Bearer Token', () => {
    it('should return promise of bearer token', async () => {
      service.authorisationBearerToken = 'token';
      const token = await service.getBearerToken();

      expect(token).toEqual('Bearer token');
    });
  });

  describe('update Bearer Token', () => {
    it('should update the bearer token', () => {
      service.authorisationBearerToken = 'initial-token';
      expect(service.authorisationBearerToken).toEqual('initial-token');
      service.updateBearerToken('updated-token');
      expect(service.authorisationBearerToken).toEqual('updated-token');
    });
  });
});
