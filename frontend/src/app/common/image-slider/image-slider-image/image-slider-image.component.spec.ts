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
});
