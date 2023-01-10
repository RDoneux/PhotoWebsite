import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarModule } from 'src/app/user-interface/nav-bar/nav-bar.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [NavBarModule, BrowserAnimationsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setUrl', () => {
    it('should set background url', () => {
      component.setUrl('test-url');
      expect(component.backgroundUrl).toEqual('test-url');
    });
    it('should set background url to default if none given', () => {
      component.setUrl('');
      expect(component.backgroundUrl).toEqual('/assets/home-default.jpg');
    });
  });
});
