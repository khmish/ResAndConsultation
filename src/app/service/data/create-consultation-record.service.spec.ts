import { TestBed } from '@angular/core/testing';

import { CreateConsultationRecordService } from './create-consultation-record.service';

describe('CreateConsultationRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateConsultationRecordService = TestBed.get(CreateConsultationRecordService);
    expect(service).toBeTruthy();
  });
});
