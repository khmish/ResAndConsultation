import { TestBed } from '@angular/core/testing';

import { ConsulFullDetailsService } from './consul-full-details.service';

describe('ConsulFullDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsulFullDetailsService = TestBed.get(ConsulFullDetailsService);
    expect(service).toBeTruthy();
  });
});
