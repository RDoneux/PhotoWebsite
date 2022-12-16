import { TestBed } from '@angular/core/testing';

import { CollectionsService } from './collections.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthorisationService } from 'src/app/services/authorisation.service';

describe('CollectionsService', () => {
  let service: CollectionsService;
  let httpMock: any = { get: () => {} };
  let authorisationService: any = { getBearerToken: () => {} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useValue: httpMock },
        { provide: AuthorisationService, useValue: authorisationService },
      ],
    });
    service = TestBed.inject(CollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get collections', () => {
    it('should request collections', async () => {
      spyOn(authorisationService, 'getBearerToken').and.returnValue(
        'test-token'
      );
      spyOn(httpMock, 'get');
      await service.getCollections();

      expect(authorisationService.getBearerToken).toHaveBeenCalled();
      expect(httpMock.get).toHaveBeenCalledWith('api/collections', {
        headers: { Authorization: 'test-token' },
      });
    });
  });
});
