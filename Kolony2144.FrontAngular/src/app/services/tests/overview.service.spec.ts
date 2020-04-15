import { TestBed } from '@angular/core/testing';

import { OverviewService } from '../overview.service';

describe('OverviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OverviewService = TestBed.inject(OverviewService);
    expect(service).toBeTruthy();
  });
});
