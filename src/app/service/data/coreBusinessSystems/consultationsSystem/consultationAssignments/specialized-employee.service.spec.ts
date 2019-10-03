import { TestBed } from '@angular/core/testing';

import { SpecializedEmployeeService } from './specialized-employee.service';

describe('SpecializedEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecializedEmployeeService = TestBed.get(SpecializedEmployeeService);
    expect(service).toBeTruthy();
  });
});
