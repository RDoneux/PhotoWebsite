import { HttpClientModule } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ModalService } from 'src/app/common/modal/modal.service';
import { PageTitleComponent } from 'src/app/common/page-title/page-title.component';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { ButtonComponent } from 'src/app/user-interface/button/button.component';
import { NavBarModule } from 'src/app/user-interface/nav-bar/nav-bar.module';
import { TextAreaComponent } from 'src/app/user-interface/text-area/text-area.component';
import { TextInputComponent } from 'src/app/user-interface/text-input/text-input.component';
import { UserInterfaceModule } from 'src/app/user-interface/user-interface.module';
import { HomeComponent } from '../home/home.component';
import { HomeModule } from '../home/home.module';

import { ContactComponent } from './contact.component';
import { ContactService } from './contact.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let contactServiceMock: any = { postMessage: () => {} };
  let routerMock: Router;
  let modalServiceMock: any = { createModal: () => {} };
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ContactComponent,
        PageTitleComponent,
        TextInputComponent,
        TextAreaComponent,
        ButtonComponent,
      ],
      imports: [
        HttpClientModule,
        PageTitleModule,
        UserInterfaceModule,
        HomeModule,
        NavBarModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
      ],
      providers: [
        { provide: ContactService, useValue: contactServiceMock },
        // { provide: Router, useValue: routerMock },
        { provide: ModalService, useValue: modalServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    routerMock = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('contact email change', () => {
    it('should emit value on change', () => {
      component.contactEmail = '';
      component.onContactEmailChange('test-value');
      expect(component.contactEmail).toEqual('test-value');
    });
  });
  describe('subject change', () => {
    it('should emit value on change', () => {
      component.subject = '';
      component.onSubjectChange('test-value');
      expect(component.subject).toEqual('test-value');
    });
  });
  describe('message change', () => {
    it('should emit value on change', () => {
      component.message = '';
      component.onMessageChange('test-value');
      expect(component.message).toEqual('test-value');
    });
  });

  describe('on submit', () => {
    it('should do nothing if values are undefined', () => {
      component.message = '';
      component.subject = 'test';
      component.contactEmail = 'test';

      spyOn(contactServiceMock, 'postMessage');

      component.onSubmit();
      expect(contactServiceMock.postMessage).not.toHaveBeenCalled();

      component.message = 'test';
      component.subject = '';
      component.contactEmail = 'test';

      component.onSubmit();
      expect(contactServiceMock.postMessage).not.toHaveBeenCalled();
      component.message = 'test';
      component.subject = '';
      component.contactEmail = '';

      component.onSubmit();
      expect(contactServiceMock.postMessage).not.toHaveBeenCalled();
    });
    it('should post message with defined values', () => {
      component.message = 'test-message';
      component.subject = 'test-subject';
      component.contactEmail = 'test-contact-email';

      spyOn(contactServiceMock, 'postMessage').and.returnValue({
        subscribe: () => {},
      });

      component.onSubmit();

      expect(contactServiceMock.postMessage).toHaveBeenCalledWith({
        contact_email: 'test-contact-email',
        subject: 'test-subject',
        message: 'test-message',
      });
    });
    it('should reset all fields', () => {
      component.message = 'test-message';
      component.subject = 'test-subject';
      component.contactEmail = 'test-contact-email';

      spyOn(contactServiceMock, 'postMessage').and.returnValue(
        of({ data: { status: '201' } })
      );

      component.onSubmit();

      expect(component.message).toBe('');
      expect(component.subject).toBe('');
      expect(component.contactEmail).toBe('');
    });

    it('should redirect to home', () => {
      component.message = 'test-message';
      component.subject = 'test-subject';
      component.contactEmail = 'test-contact-email';

      spyOn(contactServiceMock, 'postMessage').and.returnValue(
        of({ data: { status: 201 } })
      );
      spyOn(routerMock, 'navigate');

      component.onSubmit();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should display modal', () => {
      component.message = 'test-message';
      component.subject = 'test-subject';
      component.contactEmail = 'test-contact-email';

      spyOn(contactServiceMock, 'postMessage').and.returnValue(
        of({ data: { status: 201 } })
      );
      spyOn(modalServiceMock, 'createModal');

      component.onSubmit();
      expect(modalServiceMock.createModal).toHaveBeenCalledWith(
        'Thank you for your message',
        'I will get back to you as soon as I can',
        true,
        '',
        'Close'
      );
    });
  });
});
