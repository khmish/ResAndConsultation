import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSendProofreadingComponent } from './popup-send-proofreading.component';

describe('PopupSendProofreadingComponent', () => {
  let component: PopupSendProofreadingComponent;
  let fixture: ComponentFixture<PopupSendProofreadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSendProofreadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSendProofreadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
