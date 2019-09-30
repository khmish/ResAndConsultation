import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmnWorkflowViewerComponent } from './bpmn-workflow-viewer.component';

describe('BpmnWorkflowViewerComponent', () => {
  let component: BpmnWorkflowViewerComponent;
  let fixture: ComponentFixture<BpmnWorkflowViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpmnWorkflowViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpmnWorkflowViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
