/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Popup_upload_approval_assgin_teamComponent } from './popup_upload_approval_assgin_team.component';

describe('Popup_uploadComponent', () => {
  let component: Popup_upload_approval_assgin_teamComponent;
  let fixture: ComponentFixture<Popup_upload_approval_assgin_teamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Popup_upload_approval_assgin_teamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Popup_upload_approval_assgin_teamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
