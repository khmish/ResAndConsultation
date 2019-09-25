import { TestBed } from '@angular/core/testing';

import { RfcFieldsLovsListService } from './rfc-fields-lovs-list.service';

describe('RfcFieldsLovsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RfcFieldsLovsListService = TestBed.get(RfcFieldsLovsListService);
    expect(service).toBeTruthy();
  });
});
