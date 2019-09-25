import { TestBed } from '@angular/core/testing';

import { ReviewResultAndFinalDecisionService } from './review-result-and-final-decision.service';

describe('ReviewResultAndFinalDecisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewResultAndFinalDecisionService = TestBed.get(ReviewResultAndFinalDecisionService);
    expect(service).toBeTruthy();
  });
});
