/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecurityDefinitionService } from './SecurityDefinition.service';

describe('Service: SecurityDefinition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityDefinitionService]
    });
  });

  it('should ...', inject([SecurityDefinitionService], (service: SecurityDefinitionService) => {
    expect(service).toBeTruthy();
  }));
});
