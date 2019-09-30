import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializedEmployeesComponent } from './specialized-employees.component';

describe('SpecializedEmployeesComponent', () => {
  let component: SpecializedEmployeesComponent;
  let fixture: ComponentFixture<SpecializedEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecializedEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializedEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
