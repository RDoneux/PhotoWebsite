import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('close modal', () => {
    it('should set modal to undefined', () => {
      component.modal = {
        id: '71564462-277e-4308-b8c9-b8eb08616bc6',
        title: 'test-title',
        body: 'test-body',
        close: true,
        confirm: '',
        cancel: '',
      };
      component.closeModal();
      expect(component.modal).toBeUndefined();
    });
  });
  describe('onInit', () => {
    it('should subscribe to modal changes', () => {
      component.getModals();

      const service = TestBed.inject(ModalService);

      service.createModal('test-title', 'test-body');

      expect(component.modal).toBeDefined();
      expect(component.modal?.id).toBeDefined();
      expect(component.modal?.title).toEqual('test-title');
      expect(component.modal?.body).toEqual('test-body');
      expect(component.modal?.close).toBeTrue();
      expect(component.modal?.confirm).toEqual('');
      expect(component.modal?.cancel).toEqual('');
    });
  });
});
