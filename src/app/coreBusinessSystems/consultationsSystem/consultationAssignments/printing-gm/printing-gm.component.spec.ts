import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingGMComponent } from './printing-gm.component';

describe('PrintingGMComponent', () => {
  let component: PrintingGMComponent;
  let fixture: ComponentFixture<PrintingGMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintingGMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingGMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
