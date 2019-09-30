import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulTeamPresidentComponent } from './consul-team-president.component';

describe('ConsulTeamPresidentComponent', () => {
  let component: ConsulTeamPresidentComponent;
  let fixture: ComponentFixture<ConsulTeamPresidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulTeamPresidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulTeamPresidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
