import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionComponent } from './collection.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GalleryComponent } from 'src/app/pages/gallery/gallery.component';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;
  let routerMock: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'gallery', component: GalleryComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionComponent);
    routerMock = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
