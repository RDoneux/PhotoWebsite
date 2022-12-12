import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarBreakComponent } from './nav-bar-break.component';

describe('NavBarBreakComponent', () => {
  let component: NavBarBreakComponent;
  let fixture: ComponentFixture<NavBarBreakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarBreakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
