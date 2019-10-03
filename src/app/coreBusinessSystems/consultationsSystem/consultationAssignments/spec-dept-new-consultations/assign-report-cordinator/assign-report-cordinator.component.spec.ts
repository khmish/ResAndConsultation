import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignReportCordinatorComponent } from './assign-report-cordinator.component';

describe('AssignReportCordinatorComponent', () => {
  let component: AssignReportCordinatorComponent;
  let fixture: ComponentFixture<AssignReportCordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignReportCordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignReportCordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
