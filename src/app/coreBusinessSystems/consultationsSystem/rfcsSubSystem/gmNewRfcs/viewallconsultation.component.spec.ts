import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallconsultationComponent } from './viewallconsultation.component';

describe('ViewallconsultationComponent', () => {
  let component: ViewallconsultationComponent;
  let fixture: ComponentFixture<ViewallconsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewallconsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
