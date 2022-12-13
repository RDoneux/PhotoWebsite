import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ModalComponent } from './common/modal/modal.component';
import { ModalModule } from './common/modal/modal.module';
import { NavBarComponent } from './user-interface/nav-bar/nav-bar.component';
import { NavBarModule } from './user-interface/nav-bar/nav-bar.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ModalModule, NavBarModule],
      providers: [HttpClient],
      declarations: [AppComponent, NavBarComponent, ModalComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
