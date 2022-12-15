import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { NavBarModule } from 'src/app/user-interface/nav-bar/nav-bar.module';

import { AboutComponent } from './about.component';
import { AboutService } from './about.service';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let aboutServiceMock: any = { getUserData: () => {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent],
      imports: [
        NavBarModule,
        RouterTestingModule,
        HttpClientModule,
        PageTitleModule,
      ],
      providers: [{ provide: AboutService, useValue: aboutServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should set user data', async () => {
      spyOn(aboutServiceMock, 'getUserData').and.returnValue(
        of({ data: { description: 'test-description', imageUrl: 'image-url' } })
      );
      await component.ngOnInit();

      expect(aboutServiceMock.getUserData).toHaveBeenCalled();
      expect(component.description).toEqual('test-description');
      expect(component.imageUrl).toEqual('image-url');
    });
  });
});
