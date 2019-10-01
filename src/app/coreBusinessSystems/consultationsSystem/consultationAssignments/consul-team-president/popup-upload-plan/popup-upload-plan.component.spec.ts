import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUploadPlanComponent } from './popup-upload-plan.component';

describe('PopupUploadPlanComponent', () => {
  let component: PopupUploadPlanComponent;
  let fixture: ComponentFixture<PopupUploadPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupUploadPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUploadPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
