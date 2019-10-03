import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCalcRecompenseComponent } from './popup-calc-recompense.component';

describe('PopupCalcRecompenseComponent', () => {
  let component: PopupCalcRecompenseComponent;
  let fixture: ComponentFixture<PopupCalcRecompenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCalcRecompenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCalcRecompenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
