import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCoordinateConsRepComponent } from './popup-coordinate-cons-rep.component';

describe('PopupCoordinateConsRepComponent', () => {
  let component: PopupCoordinateConsRepComponent;
  let fixture: ComponentFixture<PopupCoordinateConsRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCoordinateConsRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCoordinateConsRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
