import { TestBed } from '@angular/core/testing';

import { DeputyReviewAfterGmCommitteReviewService } from './deputy-review-after-gm-committe-review.service';

describe('DeputyReviewAfterGmCommitteReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeputyReviewAfterGmCommitteReviewService = TestBed.get(DeputyReviewAfterGmCommitteReviewService);
    expect(service).toBeTruthy();
  });
});
