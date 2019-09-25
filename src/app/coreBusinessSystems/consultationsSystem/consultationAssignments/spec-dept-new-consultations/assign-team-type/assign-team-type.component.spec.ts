import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTeamTypeComponent } from './assign-team-type.component';

describe('AssignTeamTypeComponent', () => {
  let component: AssignTeamTypeComponent;
  let fixture: ComponentFixture<AssignTeamTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTeamTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTeamTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
