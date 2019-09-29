import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulIPAGMReviewComponent } from './consul-ipagmreview.component';

describe('ConsulIPAGMReviewComponent', () => {
  let component: ConsulIPAGMReviewComponent;
  let fixture: ComponentFixture<ConsulIPAGMReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulIPAGMReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulIPAGMReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
