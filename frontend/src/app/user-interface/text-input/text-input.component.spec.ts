import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputComponent } from './text-input.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on value change', () => {
    it('should emit updated value on change', () => {
      spyOn(component.valueChanged, 'emit');

      component.onModelChanged('test-value');

      expect(component.value).toBe('test-value');
      expect(component.valueChanged.emit).toHaveBeenCalledOnceWith(
        'test-value'
      );
    });
  });
});
