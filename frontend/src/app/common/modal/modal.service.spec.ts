import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create modal', () => {
    it('should create new observable', () => {
      service.getModals().subscribe({
        next: (response) => {
          expect(response.title).toEqual('test-title');
          expect(response.body).toEqual('test-body');
          expect(response.close).toEqual(true);
          expect(response.confirm).toEqual('');
          expect(response.cancel).toEqual('');
        },
      });
      service.createModal('test-title', 'test-body');
    });
  });
});
