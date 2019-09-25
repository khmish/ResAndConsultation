import { TestBed } from '@angular/core/testing';

import { RfcFullDetailsServiceService } from './rfc-full-details-service.service';

describe('RfcFullDetailsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RfcFullDetailsServiceService = TestBed.get(RfcFullDetailsServiceService);
    expect(service).toBeTruthy();
  });
});
