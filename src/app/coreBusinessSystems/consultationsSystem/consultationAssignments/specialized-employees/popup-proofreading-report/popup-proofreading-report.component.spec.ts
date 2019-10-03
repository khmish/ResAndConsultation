import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProofreadingReportComponent } from './popup-proofreading-report.component';

describe('PopupProofreadingReportComponent', () => {
  let component: PopupProofreadingReportComponent;
  let fixture: ComponentFixture<PopupProofreadingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupProofreadingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupProofreadingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
