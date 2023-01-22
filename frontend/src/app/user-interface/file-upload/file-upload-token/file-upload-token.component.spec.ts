import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadTokenComponent } from './file-upload-token.component';

describe('FileUploadTokenComponent', () => {
  let component: FileUploadTokenComponent;
  let fixture: ComponentFixture<FileUploadTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
