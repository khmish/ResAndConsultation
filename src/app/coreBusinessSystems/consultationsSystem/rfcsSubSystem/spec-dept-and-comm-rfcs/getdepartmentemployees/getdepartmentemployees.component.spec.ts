import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetdepartmentemployeesComponent } from './getdepartmentemployees.component';

describe('GetdepartmentemployeesComponent', () => {
  let component: GetdepartmentemployeesComponent;
  let fixture: ComponentFixture<GetdepartmentemployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetdepartmentemployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetdepartmentemployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
