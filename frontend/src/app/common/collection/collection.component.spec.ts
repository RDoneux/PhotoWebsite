import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionComponent } from './collection.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GalleryComponent } from 'src/app/pages/gallery/gallery.component';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;
  let routerMock: Router;
  let authServiceMock: any;
  let httpMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj(AuthorisationService, ['getBearerToken'])

    await TestBed.configureTestingModule({
      declarations: [CollectionComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'gallery', component: GalleryComponent },
        ]),
      ],
      providers: [
        {provide: AuthorisationService, useValue: authServiceMock}
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController)

    fixture = TestBed.createComponent(CollectionComponent);
    routerMock = TestBed.inject(Router);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should update cover url from http request', async () => {
      const authSpy = authServiceMock.getBearerToken.and.returnValue('test-bearer-token')
      component.imageId = "test-image-id"

      await component.ngOnInit()

      const req = httpMock.expectOne(`api/images/id/test-image-id`);
      req.flush({data: {url: 'test-url'}})

      expect(req.request.method).toEqual('GET');
      expect(authSpy).toHaveBeenCalled();
      expect(component.coverUrl).toEqual('test-url')
      httpMock.verify();

    })
  })

  describe('naviage to collection gallery', () => {
    it('should call router to navigate to gallery', () => {
      spyOn(routerMock, 'navigate');

      component.id = 'test-id';
      component.navigateToCollectionGallery();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/gallery'], {
        queryParams: { id: 'test-id' },
      });
    });
  });
});
