import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAndTakeDecisionByCommitteeComponent } from './review-and-take-decision-by-committee.component';

describe('ReviewAndTakeDecisionByCommitteeComponent', () => {
  let component: ReviewAndTakeDecisionByCommitteeComponent;
  let fixture: ComponentFixture<ReviewAndTakeDecisionByCommitteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewAndTakeDecisionByCommitteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAndTakeDecisionByCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
