import {Component, OnInit, Type} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DialogService, MessageService, SelectItem} from 'primeng/api';
import {CommonMethods} from '../../../../commons/common-methods';
import {SystemFunctionDsQueryHttpBody} from '../../../../service/data/httpBodies/user-privilages-http-body.service';
import {UserAccessService} from '../../../../service/user-access.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {GenerateJSONService} from '../../../../service/data/generate-json.service';
import {DatePipe} from '@angular/common';
import {ConsultationGetFullDataHttpBody} from '../../../../models/consultation-get-full-data-http-body';
import {AcceptRejectReviewComponent} from './accept-reject-review/accept-reject-review.component';
import {ReviewAfterDeputyRemarkComponent} from './review-after-deputy-remark/review-after-deputy-remark.component';
import {BpmnWorkflowViewerComponent} from '../../../../reusableComponents/bpmn-workflow-viewer/bpmn-workflow-viewer.component';
import {PopupUploadPlanComponent} from '../consul-team-president/popup-upload-plan/popup-upload-plan.component';
import {PopupGmApproveDesignComponent} from './popup-gm-approve-design/popup-gm-approve-design.component';
import {PopupGmRevDesignComponent} from './popup-gm-rev-design/popup-gm-rev-design.component';
import {PopupCgmApproveFinancialRecComponent} from './popup-cgm-approve-financial-rec/popup-cgm-approve-financial-rec.component';

@Component({
  selector: 'app-consul-gm-new-consultations',
  templateUrl: './consul-gm-new-consultations.component.html',
  styleUrls: ['./consul-gm-new-consultations.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  providers: [DialogService, MessageService, CommonMethods, DatePipe]
})
export class ConsulGmNewConsultationsComponent implements OnInit {

  allConsultationsData: ConsultationGetFullDataHttpBody[];
  cols: any[];
  selectedConsData: ConsultationGetFullDataHttpBody = null;
  selectedConsData1: ConsultationGetFullDataHttpBody;
  selRow: string;
  systemFunctionDsQueryHttpBodies: Array<SystemFunctionDsQueryHttpBody>;
  finalGeneratedJSON = new Map();

  selectedConsulForFullDetails: string;

  taskDefinitionFilter: SelectItem[];
  processDefinitionFilter: SelectItem[];

  taskDefinitionFilterSplittedArray: string[];
  processDefinitionFilterSplittedArray: string[];

  workflowId: string;
  taskId: string;

  // tslint:disable-next-line:max-line-length
  constructor(private messageService: MessageService, public dialogService: DialogService,
              public userAccessService: UserAccessService, private commonMethod: CommonMethods,
              private generateDataService: GenerateJSONService, private datePipe: DatePipe, private http: HttpClient) {
  }

  ngOnInit() {
    this.allConsultationsData = [];
    this.systemFunctionDsQueryHttpBodies = this.userAccessService.getSystemFunctionDsQueryHttpBody();
    // console.log(this.systemFunctionDsQueryHttpBodies);
    this.finalGeneratedJSON = this.commonMethod.createJSONFromString(this.systemFunctionDsQueryHttpBodies);

    // console.log('this.finalGeneratedJSON ------------------>  ' + this.finalGeneratedJSON.size);

    // for (let i = 0; i < this.finalGeneratedJSON.size; i++) {
    //   console.log('this.finalGeneratedJSON : ' + i + '-' + this.finalGeneratedJSON.get(i));
    // }

    this.generateDataService.sendJSONAndGetAllData(this.finalGeneratedJSON.get(0),
      this.finalGeneratedJSON.get(1),
      this.finalGeneratedJSON.get(2),
      this.finalGeneratedJSON.get(3)).subscribe((res: HttpResponse<any>) => {
      console.log('res.body -------------> ' + res.body.dsQueryResult);
      console.log('res.body -------------> ' + res.body.aTaskDefinitionList);
      console.log('res.body -------------> ' + res.body.aProcessDefinitionList);
      this.allConsultationsData = res.body.dsQueryResult;
      this.taskDefinitionFilterSplittedArray = res.body.aTaskDefinitionList.toString().split(',');
      this.processDefinitionFilterSplittedArray = res.body.aProcessDefinitionList.toString().split(',');

      this.taskDefinitionFilter = [
        {label: 'All', value: null}
      ];

      // this.taskDefinitionFilter.push({label: 'All', value: null});
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.taskDefinitionFilterSplittedArray.length; i++) {
        // tslint:disable-next-line:max-line-length
        this.taskDefinitionFilter.push({
          label: this.taskDefinitionFilterSplittedArray[i],
          value: this.taskDefinitionFilterSplittedArray[i]
        });
      }

      this.processDefinitionFilter = [
        {label: 'All', value: null}
      ];

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.processDefinitionFilterSplittedArray.length; i++) {
        // tslint:disable-next-line:max-line-length
        this.processDefinitionFilter.push({
          label: this.processDefinitionFilterSplittedArray[i],
          value: this.processDefinitionFilterSplittedArray[i]
        });
      }
    });

    this.cols = [
      {field: 'constTitle', header: 'Title'},
      {field: 'constDescription', header: 'Description'},
      {field: 'plannedStartDate', header: 'Start Date'},
      {field: 'plannedEndDate', header: 'End Date'},
      {field: 'taskDefinitionAName', header: 'الحالة'},
      {field: 'processDefinitionAName', header: 'Process Name'}

    ];
    this.selectedConsulForFullDetails = null;
  }


  showConsultations(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selRow);
    this.selectedConsulForFullDetails = this.selRow;

  }

  showBpmnWorkflow(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.workflowId = this.selectedConsData1 ? this.selectedConsData1.processDefinitionKey : 'none';
    this.taskId = this.selectedConsData1 ? this.selectedConsData1.taskDefinitionKey : 'none';
    console.log(this.workflowId);
    console.log(this.taskId);
    const myData = {
      processDefinitionKey: this.workflowId,
      taskDefinitionKey: this.taskId
    };
    const ref = this.dialogService.open(BpmnWorkflowViewerComponent, {
      data: myData,
      header: 'Workflow and Task Details',
      width: '50%',
      contentStyle: {
        height: '600px', overflow: 'hidden'
      },
      closable: true
    });
    ref.onClose.subscribe(res => this.refreshPage());
  }

  update(rowData: ConsultationGetFullDataHttpBody, tackType: string) {

    this.selectedConsData = rowData;

    // let typeComponent: any[] = [{
    //     Component: AcceptRejectReviewComponent,
    //     header: 'Consultation GM New Review'
    //   },
    //   {
    //     Component: ReviewAfterDeputyRemarkComponent,
    //     header: 'Consultation GM Review after Deputy remark'
    //   }
    // ];

    if (tackType === 'Task_02') {
      this.openDialog(AcceptRejectReviewComponent, 'Consultation GM New Review');
    } else if (tackType === 'Task_05') {
      this.openDialog(ReviewAfterDeputyRemarkComponent, 'Consultation GM Review after Deputy remark');
    }

  }

  openDialog(component: Type<any>, header: string) {
    const ref = this.dialogService.open(component, {
      header: header,
      width: '500px',
      contentStyle: {
        'max-height': '80%',
        overflow: 'auto'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }


  showSuccess(successMessage: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success Message',
      detail: successMessage
    });
  }

  showError(errorMessage: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error Message',
      detail: errorMessage
    });
  }

  refreshPage() {
    this.dialogService.dialogComponentRef.destroy();
  }
  showApproveDesignPopup(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    const ref = this.dialogService.open(PopupGmApproveDesignComponent, {
      header: 'upload',
      width: '450px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: true
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  showApproveDeputyDesignPopup(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    const ref = this.dialogService.open(PopupGmRevDesignComponent, {
      header: 'upload',
      width: '450px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: true
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }
  showApprovefinRecPopup(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    const ref = this.dialogService.open(PopupCgmApproveFinancialRecComponent, {
      header: 'upload',
      width: '450px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: true
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

}
