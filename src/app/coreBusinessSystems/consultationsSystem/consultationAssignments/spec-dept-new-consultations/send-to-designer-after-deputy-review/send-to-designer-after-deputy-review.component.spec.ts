import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToDesignerAfterDeputyReviewComponent } from './send-to-designer-after-deputy-review.component';

describe('SendToDesignerAfterDeputyReviewComponent', () => {
  let component: SendToDesignerAfterDeputyReviewComponent;
  let fixture: ComponentFixture<SendToDesignerAfterDeputyReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToDesignerAfterDeputyReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToDesignerAfterDeputyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
