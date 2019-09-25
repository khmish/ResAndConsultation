import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfcFullDetailsComponent } from './rfc-full-details.component';

describe('RfcFullDetailsComponent', () => {
  let component: RfcFullDetailsComponent;
  let fixture: ComponentFixture<RfcFullDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfcFullDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfcFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
