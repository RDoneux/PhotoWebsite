import { TestBed } from '@angular/core/testing';

import { AdminDashboardGuard } from './admin-dashboard.guard';

describe('AdminDashboardGuard', () => {
  let guard: AdminDashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminDashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
