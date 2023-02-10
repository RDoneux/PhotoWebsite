import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageManagerComponent } from './image-manager.component';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { FileUploadModule } from 'src/app/user-interface/file-upload/file-upload.module';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ImageManagerComponent', () => {
  let component: ImageManagerComponent;
  let fixture: ComponentFixture<ImageManagerComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTitleModule, FileUploadModule, HttpClientTestingModule],
      declarations: [ImageManagerComponent],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(ImageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
