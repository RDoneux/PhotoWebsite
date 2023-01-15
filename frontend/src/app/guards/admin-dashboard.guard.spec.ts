import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AdminDashboardGuard } from './admin-dashboard.guard';
import { AuthorisationService } from '../services/authorisation.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminLoginComponent } from '../pages/admin-login/admin-login.component';
import { Router } from '@angular/router';

describe('AdminDashboardGuard', () => {
  let guard: AdminDashboardGuard;
  let authorisationServiceMock: any;
  let httpMock: any;
  let routerMock: Router;

  beforeEach(() => {
    authorisationServiceMock = jasmine.createSpyObj(AuthorisationService, [
      'getBearerToken',
    ]);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: AdminLoginComponent },
        ]),
      ],
      providers: [
        { provide: AuthorisationService, useValue: authorisationServiceMock },
      ],
    });

    authorisationServiceMock.getBearerToken.and.returnValue(
      'test-bearer-token'
    );
    httpMock = TestBed.inject(HttpTestingController);
    routerMock = TestBed.inject(Router);
    guard = TestBed.inject(AdminDashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('can activate', () => {
    it('should authorise', fakeAsync(() => {
      const test = guard.canActivate();
      tick();

      const req = httpMock.expectOne('api/admin-dashboard/is-authorised');
      req.flush({}, { status: 200, statusText: 'authorised' });

      expect(test).toBeTruthy();
    }));
    it('should not authorise', fakeAsync(() => {
      spyOn(routerMock, 'navigate');
      const test = guard.canActivate();
      tick();

      const req = httpMock.expectOne('api/admin-dashboard/is-authorised');
      req.flush({}, { status: 401, statusText: 'unauthorised' });

      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    }));
  });
});
