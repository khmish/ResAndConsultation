import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulDeputyApproveDesignComponent } from './consul-deputy-approve-design.component';

describe('ConsulDeputyApproveDesignComponent', () => {
  let component: ConsulDeputyApproveDesignComponent;
  let fixture: ComponentFixture<ConsulDeputyApproveDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulDeputyApproveDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulDeputyApproveDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
