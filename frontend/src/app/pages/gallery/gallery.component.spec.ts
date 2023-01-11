import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GalleryModule } from './gallery.module';
import { of } from 'rxjs';
import { Image } from '../gallery/gallery.model';
import { AuthorisationService } from 'src/app/services/authorisation.service';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let httpMock: any;
  let authService: any;

  beforeEach(async () => {
    let authService = jasmine.createSpyObj(AuthorisationService, [
      'getBearerToken',
    ]);

    await TestBed.configureTestingModule({
      declarations: [GalleryComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, GalleryModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ id: 'test-id' }),
          },
        },
        { provide: AuthorisationService, useValue: authService },
      ],
    }).compileComponents();

    authService.getBearerToken.and.returnValue('test-auth-token');
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should make correct api call to obtain images', async () => {
      const images: Image[] = [
        {
          url: 'test-url',
          title: 'test-title',
          dateTaken: 'test-date-taken',
          author: 'test-author',
          collections: [],
        },
      ];

      await component.ngOnInit();

      const req = httpMock.expectOne('api/collections/test-id/images');
      req.flush({
        data: {
          images: images,
        },
      });

      expect(component.images).toEqual(images);
    });
  });
});
