import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarModule } from 'src/app/user-interface/nav-bar/nav-bar.module';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImageSliderComponent } from 'src/app/common/image-slider/image-slider.component';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryComponent, ImageSliderComponent],
      imports: [
        RouterTestingModule,
        NavBarModule,
        PageTitleModule,
        HttpClientModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
