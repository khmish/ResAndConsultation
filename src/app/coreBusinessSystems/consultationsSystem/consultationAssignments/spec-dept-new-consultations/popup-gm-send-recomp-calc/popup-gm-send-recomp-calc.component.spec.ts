import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupGmSendRecompCalcComponent } from './popup-gm-send-recomp-calc.component';

describe('PopupGmSendRecompCalcComponent', () => {
  let component: PopupGmSendRecompCalcComponent;
  let fixture: ComponentFixture<PopupGmSendRecompCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupGmSendRecompCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupGmSendRecompCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
