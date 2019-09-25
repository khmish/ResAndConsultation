import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityDefinitionComponent } from './security-definition.component';

describe('SecurityDefinitionComponent', () => {
  let component: SecurityDefinitionComponent;
  let fixture: ComponentFixture<SecurityDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
