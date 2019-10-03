import { TestBed } from '@angular/core/testing';

import { PrintingGMService } from './printing-gm.service';

describe('PrintingGMService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrintingGMService = TestBed.get(PrintingGMService);
    expect(service).toBeTruthy();
  });
});
