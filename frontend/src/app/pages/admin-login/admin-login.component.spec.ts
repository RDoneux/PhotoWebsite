import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginComponent } from './admin-login.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NavBarModule } from 'src/app/user-interface/nav-bar/nav-bar.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TextInputModule } from 'src/app/user-interface/text-input/text-input.module';
import { ButtonModule } from 'src/app/user-interface/button/button.module';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;
  let httpMock: HttpTestingController;
  let authServiceMock: AuthorisationService;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj(AuthorisationService, [
      'updateBearerToken',
    ]);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NavBarModule,
        RouterTestingModule.withRoutes([
          { path: 'admin-dashboard', component: AdminDashboardComponent },
        ]),
        PageTitleModule,
        TextInputModule,
        ButtonModule,
      ],
      declarations: [AdminLoginComponent],
      providers: [{ provide: AuthorisationService, useValue: authServiceMock }],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('update username', () => {
    it('should update user name', () => {
      component.username = 'old-username';
      expect(component.username).toEqual('old-username');
      component.updateUsername('new-username');
      expect(component.username).toEqual('new-username');
    });
  });
  describe('update password', () => {
    it('should update password', () => {
      component.password = 'old-password';
      expect(component.password).toEqual('old-password');
      component.updatePassword('new-password');
      expect(component.password).toEqual('new-password');
    });
  });
  describe('login', () => {
    it('should update feedback message if username or password is unset', () => {
      component.feedbackMessage = '';
      component.username = '';
      component.password = '';

      component.login();

      expect(component.feedbackMessage).toEqual(
        'Please provide a password and username.'
      );

      component.username = 'set';
      component.password = '';
      component.feedbackMessage = '';
      component.login();

      expect(component.feedbackMessage).toEqual(
        'Please provide a password and username.'
      );

      component.username = '';
      component.password = 'set';
      component.feedbackMessage = '';
      component.login();

      expect(component.feedbackMessage).toEqual(
        'Please provide a password and username.'
      );
    });
    it('should make http call then update bearer token and redirect', () => {
      component.username = 'set';
      component.password = 'set';

      component.login();

      const req = httpMock.expectOne('api/user');
      req.flush(
        { data: 'test-bearer-token' },
        { status: 200, statusText: 'success' }
      );

      expect(authServiceMock.updateBearerToken).toHaveBeenCalledOnceWith(
        'test-bearer-token'
      );
    });
    it('should update feedback message and reset username and password on error', () => {
      component.username = 'set';
      component.password = 'set';

      component.login();

      const req = httpMock.expectOne('api/user');
      req.flush(
        { data: 'test-bearer-token' },
        { status: 401, statusText: 'unauthorised' }
      );

      expect(component.username).toEqual('');
      expect(component.password).toEqual('');
      expect(component.feedbackMessage).toEqual(
        'Incorrect password or username, please try again.'
      );
    });
  });
});
