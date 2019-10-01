import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAndSendToCommitteeComponent } from './review-and-send-to-committee.component';

describe('ReviewAndSendToCommitteeComponent', () => {
  let component: ReviewAndSendToCommitteeComponent;
  let fixture: ComponentFixture<ReviewAndSendToCommitteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewAndSendToCommitteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAndSendToCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
