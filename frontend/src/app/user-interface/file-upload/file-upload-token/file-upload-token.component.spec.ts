import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadTokenComponent } from './file-upload-token.component';
import { UtilsService } from 'src/app/services/utils.service';

describe('FileUploadTokenComponent', () => {
  let component: FileUploadTokenComponent;
  let fixture: ComponentFixture<FileUploadTokenComponent>;
  let utilsServiceMock: UtilsService;

  interface Blob {
    readonly size: number;
    readonly type: string;
    slice(start?: number, end?: number, contentType?: string): Blob;
  }

  var Blob: {
    prototype: Blob;
    new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
  };

  const testFile: any = { size: 1, id: 'test-id' };

  beforeEach(async () => {
    utilsServiceMock = jasmine.createSpyObj(['convertBytesToMegaBytes']);
    await TestBed.configureTestingModule({
      declarations: [FileUploadTokenComponent],
      providers: [{ provide: UtilsService, useValue: utilsServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadTokenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on init', () => {
    it('should do nothing if file is undefined', () => {
      component.file = undefined;
      component.ngOnInit();
      expect(utilsServiceMock.convertBytesToMegaBytes).not.toHaveBeenCalled();
    });
    it('should set bytes if file is defined', () => {
      component.file = testFile;
      component.ngOnInit();
      expect(utilsServiceMock.convertBytesToMegaBytes).toHaveBeenCalledWith(1);
    });
  });
  describe('removed', () => {
    it('should do nothing if file is undefined', () => {
      spyOn(component.onRemoved, 'emit');
      component.removed();
      expect(component.onRemoved.emit).not.toHaveBeenCalled();
    });
    it('should emit file id if file is defined', () => {
      spyOn(component.onRemoved, 'emit');
      component.file = testFile;
      component.removed();
      expect(component.onRemoved.emit).toHaveBeenCalledWith('test-id');
    });
  });
});
