import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulGmNewRfcsComponent } from './consul-gm-new-rfcs.component';

describe('ConsulGmNewRfcsComponent', () => {
  let component: ConsulGmNewRfcsComponent;
  let fixture: ComponentFixture<ConsulGmNewRfcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulGmNewRfcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulGmNewRfcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
