import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecDeptAndCommRfcsComponent } from './spec-dept-and-comm-rfcs.component';

describe('SpecDeptAndCommRfcsComponent', () => {
  let component: SpecDeptAndCommRfcsComponent;
  let fixture: ComponentFixture<SpecDeptAndCommRfcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecDeptAndCommRfcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecDeptAndCommRfcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
