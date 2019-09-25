import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulDeputyNewConsultationsComponent } from './consul-deputy-new-consultations.component';

describe('ConsulDeputyNewConsultationsComponent', () => {
  let component: ConsulDeputyNewConsultationsComponent;
  let fixture: ComponentFixture<ConsulDeputyNewConsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulDeputyNewConsultationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulDeputyNewConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
