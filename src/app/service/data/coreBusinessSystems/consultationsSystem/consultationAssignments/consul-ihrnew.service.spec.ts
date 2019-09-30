import { TestBed } from '@angular/core/testing';

import { ConsulIhrnewService } from './consul-ihrnew.service';

describe('ConsulIhrnewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsulIhrnewService = TestBed.get(ConsulIhrnewService);
    expect(service).toBeTruthy();
  });
});
