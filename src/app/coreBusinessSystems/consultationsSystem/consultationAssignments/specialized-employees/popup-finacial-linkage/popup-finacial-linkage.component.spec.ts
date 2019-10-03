import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFinacialLinkageComponent } from './popup-finacial-linkage.component';

describe('PopupFinacialLinkageComponent', () => {
  let component: PopupFinacialLinkageComponent;
  let fixture: ComponentFixture<PopupFinacialLinkageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupFinacialLinkageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupFinacialLinkageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
