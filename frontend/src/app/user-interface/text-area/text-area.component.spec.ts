import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextAreaComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TextAreaComponent);
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
