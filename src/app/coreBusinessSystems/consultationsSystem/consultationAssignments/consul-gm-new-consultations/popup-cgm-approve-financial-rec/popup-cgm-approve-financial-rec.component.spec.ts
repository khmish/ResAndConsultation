import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCgmApproveFinancialRecComponent } from './popup-cgm-approve-financial-rec.component';

describe('PopupCgmApproveFinancialRecComponent', () => {
  let component: PopupCgmApproveFinancialRecComponent;
  let fixture: ComponentFixture<PopupCgmApproveFinancialRecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCgmApproveFinancialRecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCgmApproveFinancialRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
