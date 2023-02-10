import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminDashboardComponent } from 'src/app/pages/admin-dashboard/admin-dashboard.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let httpMock: HttpTestingController;
  let authServiceMock: any;
  let routerMock: Router;

  let testFileEvent: any;
  beforeEach(async () => {
    testFileEvent = { target: { files: { 0: {}, 1: {} } } };
    authServiceMock = jasmine.createSpyObj(AuthorisationService, [
      'getBearerToken',
    ]);

    await TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'admin-dashboard', component: AdminDashboardComponent },
        ]),
      ],
      providers: [{ provide: AuthorisationService, useValue: authServiceMock }],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    routerMock = TestBed.inject(Router);

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should set dropzonemessage to default', () => {
      component.dropZoneDefaultMessage = 'default-message';
      component.dropZoneMessage = 'undefined';
      component.ngOnInit();

      expect(component.dropZoneMessage).toEqual(
        component.dropZoneDefaultMessage
      );
    });
  });

  describe('add file for upload', () => {
    it('should add all files from object to file upload array', fakeAsync(() => {
      spyOn(component, 'imageFileToBase64').and.returnValue(
        new Promise<string>((resolve, reject) => {
          resolve('test-base64-string');
        })
      );
      component.addFileForUpload(testFileEvent);
      tick();
      expect(component.filesUploaded.length).toEqual(2);
    }));

    it('should add imageSrc and id params to image', fakeAsync(() => {
      spyOn(component, 'imageFileToBase64').and.returnValue(
        new Promise<string>((resolve, reject) => {
          resolve('test-base64-string');
        })
      );
      component.addFileForUpload(testFileEvent);
      tick();
      expect(component.filesUploaded[0].imageSrc).toEqual('test-base64-string');
      expect(component.filesUploaded[0].id).toBeDefined();
    }));

    it('should look into data transfer property if target is undefined', fakeAsync(() => {
      spyOn(component, 'imageFileToBase64').and.returnValue(
        new Promise<string>((resolve) => {
          resolve('test-base64-string');
        })
      );
      component.addFileForUpload({
        target: { files: undefined },
        dataTransfer: { files: { 0: {}, 1: {} } },
      });
      tick();
      expect(component.filesUploaded.length).toEqual(2);
    }));
  });

  describe('uploadFiles', () => {
    it('should set uploading to true and update dropzone message', async () => {
      const authSpy =
        authServiceMock.getBearerToken.and.returnValue('test-bearer-token');

      component.dropZoneMessage = 'test-before-dropzone-message';
      component.uploading = false;
      await component.uploadFiles();
      expect(authServiceMock.getBearerToken).toHaveBeenCalled();
      expect(component.uploading).toBeTrue();
      expect(component.dropZoneMessage).toEqual('Uploading...');
    });
    it('should send files uploaded array as formdata', fakeAsync(() => {
      const authSpy =
        authServiceMock.getBearerToken.and.returnValue('test-bearer-token');
      spyOn(component, 'imageFileToBase64').and.returnValue(
        new Promise<string>((resolve, reject) => {
          resolve('test-base64-string');
        })
      );
      spyOn(component, 'setSuccessMessage');
      component.success = false;
      const file: any = new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      });
      file['uploading'] = true;
      file['uploaded'] = false;
      component.addFileForUpload({ target: { files: { 0: file } } });

      component.uploadFiles();
      tick();

      const req = httpMock.expectOne('api/images');
      req.flush({}, { status: 200, statusText: 'success' });

      expect(req.request.method).toEqual('POST');
      expect(file['uploading']).toBeFalse();
      expect(file['uploaded']).toBeTrue();
      expect(component.setSuccessMessage).toHaveBeenCalledOnceWith(false);
      expect(component.success).toBeTrue();
    }));

    it('should set files error state if error encountered', fakeAsync(() => {
      const authSpy =
        authServiceMock.getBearerToken.and.returnValue('test-bearer-token');
      spyOn(component, 'imageFileToBase64').and.returnValue(
        new Promise<string>((resolve, reject) => {
          resolve('test-base64-string');
        })
      );
      spyOn(component, 'setSuccessMessage');
      component.success = false;
      const file: any = new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      });
      file['uploading'] = true;
      file['uploaded'] = false;
      component.addFileForUpload({ target: { files: { 0: file } } });
      component.uploadFiles();
      tick();

      const req = httpMock.expectOne('api/images');
      req.flush({}, { status: 500, statusText: 'unsuccessfull' });

      expect(req.request.method).toEqual('POST');
      expect(file['uploading']).toBeTrue();
      expect(file['uploaded']).toBeFalse();
      expect(component.setSuccessMessage).toHaveBeenCalledOnceWith(true);
      expect(component.success).toBeFalse();
    }));
  });
  describe('Image File to Base64', () => {
    it('should return a promise which when resolved converts a file to a base64 string', fakeAsync(() => {
      const file: any = new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      });
      const base64String = component.imageFileToBase64(file);
      tick();
      expect(base64String).toBeDefined();
    }));
  });
  describe('reset', () => {
    it('should reset the component', () => {
      component.dropZoneMessage = 'non-default-message';
      component.success = true;
      component.filesUploaded = testFileEvent;
      component.uploading = true;

      component.reset();

      expect(component.dropZoneMessage).not.toEqual('non-default-message');
      expect(component.success).not.toBeTrue();
      expect(component.filesUploaded).not.toEqual(testFileEvent);
      expect(component.uploading).not.toBeTrue();

      expect(component.dropZoneDefaultMessage).toEqual(
        component.dropZoneDefaultMessage
      );
      expect(component.success).toBeFalse();
      expect(component.filesUploaded).toEqual([]);
      expect(component.uploading).toBeFalse();
    });
  });
  describe('navigateToAdminMenu', () => {
    it('should navigate to correct url', () => {
      spyOn(routerMock, 'navigate');
      component.navigateToAdminMenu();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/admin-dashboard']);
    });
  });
  describe('setSuccessMessage', () => {
    it('should set to error message if there is an error', () => {
      expect(component.setSuccessMessage(true)).toEqual(
        'There was an issue with one or more uploads. Please try again later'
      );
    });
    it('should provide feedback on number of files successfully uploaded', () => {
      const file: any = new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      });

      expect(component.setSuccessMessage(false)).toEqual(
        '0 files successfully uploaded.'
      );

      component.filesUploaded.push(file);
      expect(component.setSuccessMessage(false)).toEqual(
        '1 file successfully uploaded.'
      );

      component.filesUploaded.push(file);
      expect(component.setSuccessMessage(false)).toEqual(
        '2 files successfully uploaded.'
      );
    });
  });
  describe('remove token', () => {
    it('should remove a token by id', () => {
      const file: any = new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      });
      file['id'] = 'test-id';
      component.filesUploaded.push(file);

      expect(component.filesUploaded).toContain(file);

      component.removeToken('test-id');

      expect(component.filesUploaded).not.toContain(file);
    });
  });
});
