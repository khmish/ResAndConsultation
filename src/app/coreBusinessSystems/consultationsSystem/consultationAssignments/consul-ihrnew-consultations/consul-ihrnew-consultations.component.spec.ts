import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulIHRNewConsultationsComponent } from './consul-ihrnew-consultations.component';

describe('ConsulIHRNewConsultationsComponent', () => {
  let component: ConsulIHRNewConsultationsComponent;
  let fixture: ComponentFixture<ConsulIHRNewConsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulIHRNewConsultationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulIHRNewConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
