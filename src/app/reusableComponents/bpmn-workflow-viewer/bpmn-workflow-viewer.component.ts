import {AfterContentInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
// tslint:disable-next-line:max-line-length
import * as BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.development.js';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {importDiagram} from './rx';
import {DynamicDialogConfig} from 'primeng/api';

@Component({
  selector: 'app-bpmn-workflow-viewer',
  templateUrl: './bpmn-workflow-viewer.component.html',
  // styleUrls: ['./bpmn-workflow-viewer.component.scss']
  styles: [
      `
          .diagram-container {
              height: 520px;
              width: 100%;
              border-style: solid;
              border-width: 1px;
              border-radius: 5px;
              position: relative;
          }
    `
  ]
})
export class BpmnWorkflowViewerComponent implements OnInit, AfterContentInit, OnDestroy {

  private bpmnJS: BpmnJS;

  taskId: string;

  // @ts-ignore
  @ViewChild('ref') private el: ElementRef;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();

  @Input() private url: string;
  workflowModelFile = new Map();

  constructor(private http: HttpClient, public config: DynamicDialogConfig) {

    this.bpmnJS = new BpmnJS();
    this.bpmnJS.on('import.done', ({error}) => {
      if (!error) {
        this.bpmnJS.get('canvas').zoom('fit-viewport');
      }
    });
  }

  ngOnInit(): void {
    console.log(this.config.data.processDefinitionKey);
    console.log(this.config.data.taskDefinitionKey);
    this.workflowModelFile.set('WKF008_01P', 'WKF008_01_RFC.bpmn');
    this.workflowModelFile.set('WKF008_02P_C01', 'WKF008_02_C01.bpmn');
    this.workflowModelFile.set('WKF008_02P_C02', 'WKF008_02_C02.bpmn');
    this.workflowModelFile.set('WKF008_02P_C03', 'WKF008_02_C03.bpmn');
    this.workflowModelFile.set('WKF008_02P_C04', 'WKF008_02_C04.bpmn');

    // tslint:disable-next-line:max-line-length
    console.log('this.workflowModelFile.get(this.consulGM.workflowId) ---------------------------' + this.workflowModelFile.get(this.config.data.processDefinitionKey));

    this.loadUrl('././assets/bpmn/' + this.workflowModelFile.get(this.config.data.processDefinitionKey));
    // tslint:disable-next-line:prefer-const
    // console.log(this.bpmnJS.get('canvas').getElementById('Task_01'));

  }


  ngAfterContentInit(): void {
    this.bpmnJS.attachTo(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }

  /**
   * Load diagram from URL and emit completion event
   */
  loadUrl(url: string) {
    return (
      this.http.get(url, {responseType: 'text'}).pipe(
        catchError(err => throwError(err)),
        importDiagram(this.bpmnJS, this.config.data.taskDefinitionKey)
      ).subscribe(
        (warnings) => {
          this.importDone.emit({
            type: 'success',
            warnings
          });
        },
        (err) => {
          this.importDone.emit({
            type: 'error',
            error: err
          });
        }
      )
    );
  }

  onClose() {
    // this.consulGM.refreshPage();
  }

  zoomIn() {
    this.bpmnJS.get('zoomScroll').stepZoom(1);
  }

  zoomOut() {
    this.bpmnJS.get('zoomScroll').stepZoom(-1);
  }
}
