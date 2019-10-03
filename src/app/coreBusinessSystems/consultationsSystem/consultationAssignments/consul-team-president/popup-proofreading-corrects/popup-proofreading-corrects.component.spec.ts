import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProofreadingCorrectsComponent } from './popup-proofreading-corrects.component';

describe('PopupProofreadingCorrectsComponent', () => {
  let component: PopupProofreadingCorrectsComponent;
  let fixture: ComponentFixture<PopupProofreadingCorrectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupProofreadingCorrectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupProofreadingCorrectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
