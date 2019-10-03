import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSciReviewCorrectionComponent } from './popup-sci-review-correction.component';

describe('PopupSciReviewCorrectionComponent', () => {
  let component: PopupSciReviewCorrectionComponent;
  let fixture: ComponentFixture<PopupSciReviewCorrectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSciReviewCorrectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSciReviewCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
