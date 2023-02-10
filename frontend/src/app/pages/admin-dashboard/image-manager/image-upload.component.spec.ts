import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadComponent } from './image-upload.component';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { FileUploadModule } from 'src/app/user-interface/file-upload/file-upload.module';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ImageUploadComponent', () => {
  let component: ImageUploadComponent;
  let fixture: ComponentFixture<ImageUploadComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTitleModule, FileUploadModule, HttpClientTestingModule],
      declarations: [ImageUploadComponent],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(ImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
