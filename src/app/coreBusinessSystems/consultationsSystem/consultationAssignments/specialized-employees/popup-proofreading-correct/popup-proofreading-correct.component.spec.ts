import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProofreadingCorrectComponent } from './popup-proofreading-correct.component';

describe('PopupProofreadingCorrectComponent', () => {
  let component: PopupProofreadingCorrectComponent;
  let fixture: ComponentFixture<PopupProofreadingCorrectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupProofreadingCorrectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupProofreadingCorrectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
