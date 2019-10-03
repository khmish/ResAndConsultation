import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewProofReadingComponent } from './review-proof-reading.component';

describe('ReviewProofReadingComponent', () => {
  let component: ReviewProofReadingComponent;
  let fixture: ComponentFixture<ReviewProofReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewProofReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewProofReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
