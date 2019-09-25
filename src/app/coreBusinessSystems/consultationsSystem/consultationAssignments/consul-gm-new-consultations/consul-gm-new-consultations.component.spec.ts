import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulGmNewConsultationsComponent } from './consul-gm-new-consultations.component';

describe('ConsulGmNewConsultationsComponent', () => {
  let component: ConsulGmNewConsultationsComponent;
  let fixture: ComponentFixture<ConsulGmNewConsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulGmNewConsultationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulGmNewConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
