import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDesignedReportComponent } from './review-designed-report.component';

describe('ReviewDesignedReportComponent', () => {
  let component: ReviewDesignedReportComponent;
  let fixture: ComponentFixture<ReviewDesignedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewDesignedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDesignedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
