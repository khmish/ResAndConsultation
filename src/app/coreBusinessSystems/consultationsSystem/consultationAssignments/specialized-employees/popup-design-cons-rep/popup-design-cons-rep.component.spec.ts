import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDesignConsRepComponent } from './popup-design-cons-rep.component';

describe('PopupDesignConsRepComponent', () => {
  let component: PopupDesignConsRepComponent;
  let fixture: ComponentFixture<PopupDesignConsRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDesignConsRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDesignConsRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
