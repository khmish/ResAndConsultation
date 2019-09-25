import { TestBed } from '@angular/core/testing';

import { NewRfcsDeputyReviewServiceService } from './new-rfcs-deputy-review-service.service';

describe('NewRfcsDeputyReviewServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewRfcsDeputyReviewServiceService = TestBed.get(NewRfcsDeputyReviewServiceService);
    expect(service).toBeTruthy();
  });
});
