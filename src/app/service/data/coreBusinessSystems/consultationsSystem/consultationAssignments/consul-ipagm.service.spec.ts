import { TestBed } from '@angular/core/testing';

import { ConsulIPAGMService } from './consul-ipagm.service';

describe('ConsulIPAGMService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsulIPAGMService = TestBed.get(ConsulIPAGMService);
    expect(service).toBeTruthy();
  });
});
