import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewConsultationReportComponent } from './review-consultation-report.component';

describe('ReviewConsultationReportComponent', () => {
  let component: ReviewConsultationReportComponent;
  let fixture: ComponentFixture<ReviewConsultationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewConsultationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewConsultationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
