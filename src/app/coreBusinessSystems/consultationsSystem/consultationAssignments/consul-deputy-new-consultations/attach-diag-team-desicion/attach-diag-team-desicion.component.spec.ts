import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachDiagTeamDesicionComponent } from './attach-diag-team-desicion.component';

describe('AttachDiagTeamDesicionComponent', () => {
  let component: AttachDiagTeamDesicionComponent;
  let fixture: ComponentFixture<AttachDiagTeamDesicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachDiagTeamDesicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachDiagTeamDesicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
