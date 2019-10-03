import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUploadConsulReportComponent } from './popup-upload-consul-report.component';

describe('PopupUploadConsulReportComponent', () => {
  let component: PopupUploadConsulReportComponent;
  let fixture: ComponentFixture<PopupUploadConsulReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupUploadConsulReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUploadConsulReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
