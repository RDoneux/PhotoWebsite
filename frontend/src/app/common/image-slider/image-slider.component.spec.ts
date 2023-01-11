import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSliderComponent } from './image-slider.component';

describe('ImageSliderComponent', () => {
  let component: ImageSliderComponent;
  let fixture: ComponentFixture<ImageSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('image clicked', () => {
    it('should do nothing if images is undefined', () => {
      component.targetImageIndex = 0;
      component.desiredRotation = 1;
      component.images = undefined;

      component.imageClicked({ index: 3, width: 2 });

      expect(component.targetImageIndex).toEqual(0);
      expect(component.desiredRotation).toEqual(1);
    });
    it('should set index and rotation', () => {
      component.targetImageIndex = 0;
      component.desiredRotation = 1;
      component.images = [
        {
          url: 'test-url',
          title: 'test-title',
          dateTaken: 'test-date-taken',
          author: 'test-author',
          collections: [],
        },
      ];

      component.imageClicked({ index: 3, width: 1 });

      expect(component.targetImageIndex).toEqual(3);
      expect(component.desiredRotation).toEqual(-154.28571428571428);
    });
    it('should set index and rotation', () => {
      component.targetImageIndex = 0;
      component.desiredRotation = 1;
      component.minImageNumber = 0
      component.images = [
        {
          url: 'test-url',
          title: 'test-title',
          dateTaken: 'test-date-taken',
          author: 'test-author',
          collections: [],
        },
      ];

      component.imageClicked({ index: 3, width: 1 });

      expect(component.targetImageIndex).toEqual(3);
      expect(component.desiredRotation).toEqual(-360);
    });
  });
});
