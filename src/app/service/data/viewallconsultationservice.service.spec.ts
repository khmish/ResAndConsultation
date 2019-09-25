import { TestBed } from '@angular/core/testing';

import { ViewallconsultationserviceService } from './viewallconsultationservice.service';

describe('ViewallconsultationserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewallconsultationserviceService = TestBed.get(ViewallconsultationserviceService);
    expect(service).toBeTruthy();
  });
});
