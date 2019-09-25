import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfcCommitteeManualApprovalComponent } from './rfc-committee-manual-approval.component';

describe('RfcCommitteeManualApprovalComponent', () => {
  let component: RfcCommitteeManualApprovalComponent;
  let fixture: ComponentFixture<RfcCommitteeManualApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfcCommitteeManualApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfcCommitteeManualApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
