import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrivlegesComponent } from './user-privleges.component';

describe('UserPrivlegesComponent', () => {
  let component: UserPrivlegesComponent;
  let fixture: ComponentFixture<UserPrivlegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPrivlegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPrivlegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
