import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupScientificReviewResultComponent } from './popup-scientific-review-result.component';

describe('PopupScientificReviewResultComponent', () => {
  let component: PopupScientificReviewResultComponent;
  let fixture: ComponentFixture<PopupScientificReviewResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupScientificReviewResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupScientificReviewResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
