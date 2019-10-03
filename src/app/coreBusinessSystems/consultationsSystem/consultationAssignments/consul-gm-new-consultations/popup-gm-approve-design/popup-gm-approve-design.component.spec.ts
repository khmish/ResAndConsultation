import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupGmApproveDesignComponent } from './popup-gm-approve-design.component';

describe('PopupGmApproveDesignComponent', () => {
  let component: PopupGmApproveDesignComponent;
  let fixture: ComponentFixture<PopupGmApproveDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupGmApproveDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupGmApproveDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
