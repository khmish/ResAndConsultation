import { TestBed } from '@angular/core/testing';

import { GmReviewAfterCommitteeService } from './gm-review-after-committee.service';

describe('GmReviewAfterCommitteeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GmReviewAfterCommitteeService = TestBed.get(GmReviewAfterCommitteeService);
    expect(service).toBeTruthy();
  });
});
