import { TestBed } from '@angular/core/testing';

import { ConsulGmService } from './consul-gm.service';

describe('ConsulGmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsulGmService = TestBed.get(ConsulGmService);
    expect(service).toBeTruthy();
  });
});
