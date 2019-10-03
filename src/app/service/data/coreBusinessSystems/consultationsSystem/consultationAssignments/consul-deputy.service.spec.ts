import { TestBed } from '@angular/core/testing';

import { ConsulDeputyService } from './consul-deputy.service';

describe('ConsulDeputyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsulDeputyService = TestBed.get(ConsulDeputyService);
    expect(service).toBeTruthy();
  });
});
