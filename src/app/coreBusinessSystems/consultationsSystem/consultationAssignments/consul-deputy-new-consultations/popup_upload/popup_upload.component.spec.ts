/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Popup_uploadComponent } from './popup_upload.component';

describe('Popup_uploadComponent', () => {
  let component: Popup_uploadComponent;
  let fixture: ComponentFixture<Popup_uploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Popup_uploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Popup_uploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
