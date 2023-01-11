import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSliderImageComponent } from './image-slider-image.component';

describe('ImageSliderImageComponent', () => {
  let component: ImageSliderImageComponent;
  let fixture: ComponentFixture<ImageSliderImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSliderImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageSliderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClick', () => {
    it('should emit index and width', () => {
      component.index = 1;
      component.galleryImage = {nativeElement: {width: 2}};

      spyOn(component.clicked, 'emit');

      component.onClick();

      expect(component.clicked.emit).toHaveBeenCalledOnceWith({index: 1, width: 2});
    })
    it('should emit default index if not set', () => {
      component.index = undefined;
      component.galleryImage = {nativeElement: {width: 2}};

      spyOn(component.clicked, 'emit');

      component.onClick();

      expect(component.clicked.emit).toHaveBeenCalledOnceWith({index: 0, width: 2});
    })
  })
});
