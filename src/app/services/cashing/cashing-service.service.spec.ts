import { TestBed } from '@angular/core/testing';

import { CashingServiceService } from './cashing-service.service';

describe('CashingServiceService', () => {
  let service: CashingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
