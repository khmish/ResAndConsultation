import { TestBed } from '@angular/core/testing';

import { DeputyNewrfcService } from './deputy-newrfc.service';

describe('DeputyNewrfcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeputyNewrfcService = TestBed.get(DeputyNewrfcService);
    expect(service).toBeTruthy();
  });
});
