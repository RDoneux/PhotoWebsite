import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('convert bytes to megabytes', () => {
    it('should convert bytes to bytes when less than or equal to 900 bytes', () => {
      const output = service.convertBytesToMegaBytes(900);
      expect(output).toBe('900 Bytes');
    });
    it('should convert bytes to KB when greater than 900 bytes', () => {
      const output = service.convertBytesToMegaBytes(901);
      expect(output).toBe('0.88 KB');
    });
    it('should convert bytes to MB when greater than 100000 bytes', () => {
      const output = service.convertBytesToMegaBytes(1200000);
      expect(output).toBe('1.14 MB');
    });
    it('should convert bytes to GB when greater than 1000000000 bytes', () => {
      const output = service.convertBytesToMegaBytes(1200000000);
      expect(output).toBe('1.12 GB');
    })
  });
});
