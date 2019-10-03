import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupGmRevDesignComponent } from './popup-gm-rev-design.component';

describe('PopupGmRevDesignComponent', () => {
  let component: PopupGmRevDesignComponent;
  let fixture: ComponentFixture<PopupGmRevDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupGmRevDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupGmRevDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
