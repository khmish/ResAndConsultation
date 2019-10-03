import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCdeputyApproveFinancialRecComponent } from './popup-cdeputy-approve-financial-rec.component';

describe('PopupCdeputyApproveFinancialRecComponent', () => {
  let component: PopupCdeputyApproveFinancialRecComponent;
  let fixture: ComponentFixture<PopupCdeputyApproveFinancialRecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCdeputyApproveFinancialRecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCdeputyApproveFinancialRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
