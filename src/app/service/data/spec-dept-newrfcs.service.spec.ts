import { TestBed } from '@angular/core/testing';

import { SpecDeptNewrfcsService } from './spec-dept-newrfcs.service';

describe('SpecDeptNewrfcsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecDeptNewrfcsService = TestBed.get(SpecDeptNewrfcsService);
    expect(service).toBeTruthy();
  });
});
