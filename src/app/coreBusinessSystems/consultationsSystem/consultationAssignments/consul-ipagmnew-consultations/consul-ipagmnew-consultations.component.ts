import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ConfirmationService, DialogService, MessageService, SelectItem} from 'primeng/api';
import {CommonMethods} from '../../../../commons/common-methods';
import {DatePipe} from '@angular/common';
import {ConsultationGetFullDataHttpBody, ErrorMessage} from '../../../../models/consultation-get-full-data-http-body';
import {SystemFunctionDsQueryHttpBody} from '../../../../service/data/httpBodies/user-privilages-http-body.service';
import {UserAccessService} from '../../../../service/user-access.service';
import {GenerateJSONService} from '../../../../service/data/generate-json.service';
import {HttpResponse} from '@angular/common/http';
import {ConsulIPAGMReviewComponent} from './consul-ipagmreview/consul-ipagmreview.component';
import {BpmnWorkflowViewerComponent} from '../../../../reusableComponents/bpmn-workflow-viewer/bpmn-workflow-viewer.component';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ConsulIPAGMService} from '../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-ipagm.service';

@Component({
  selector: 'app-consul-ipagmnew-consultations',
  templateUrl: './consul-ipagmnew-consultations.component.html',
  styleUrls: ['./consul-ipagmnew-consultations.component.scss'],
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
  providers: [DialogService, MessageService, CommonMethods, DatePipe, ConfirmationService]
})
export class ConsulIPAGMNewConsultationsComponent implements OnInit {

  allConsultationsData: ConsultationGetFullDataHttpBody[];
  cols: any[];
  selectedConsData: ConsultationGetFullDataHttpBody;
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
              private generateDataService: GenerateJSONService, private datePipe: DatePipe,
              private confirmationService: ConfirmationService, private ipaGMService: ConsulIPAGMService) {
  }

  ngOnInit() {
    this.systemFunctionDsQueryHttpBodies = this.userAccessService.getSystemFunctionDsQueryHttpBody();
    console.log(this.systemFunctionDsQueryHttpBodies);
    this.finalGeneratedJSON = this.commonMethod.createJSONFromString(this.systemFunctionDsQueryHttpBodies);

    console.log('this.finalGeneratedJSON ------------------>  ' + this.finalGeneratedJSON.size);

    for (let i = 0; i < this.finalGeneratedJSON.size; i++) {
      console.log('this.finalGeneratedJSON : ' + i + '-' + this.finalGeneratedJSON.get(i));
    }

    this.generateDataService.sendJSONAndGetAllData(this.finalGeneratedJSON.get(0),
      this.finalGeneratedJSON.get(1),
      this.finalGeneratedJSON.get(2),
      this.finalGeneratedJSON.get(3)).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.dsQueryResult);
      this.allConsultationsData = res.body.dsQueryResult;
      console.log('res.body -------' + this.allConsultationsData);
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

  sendForApproval(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selRow);
    const ref = this.dialogService.open(ConsulIPAGMReviewComponent, {
      header: 'Review',
      width: '500px',
      contentStyle: {
        height: '15em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  refreshPage() {
    this.dialogService.dialogComponentRef.destroy();
  }

  showSuccess(successMessage: string) {
    this.messageService.add({severity: 'success', summary: 'Success Message', detail: successMessage});
  }

  showError(errorMessage: string) {
    this.messageService.add({severity: 'error', summary: 'Error Message', detail: errorMessage});
  }

  notifyOrganization(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selRow);
    this.confirmationService.confirm({
      message: 'Are you sure you want to notify the organization?',
      header: 'Notify Organization',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ipaGMService.notifyOrganization(this.selRow).pipe(
          catchError(err => {
            console.log('Handling error locally and rethrowing it...', err);
            if (!err.message.includes('OK')) {
              this.showError('Service is down');
            } else {
              this.showError(err.error.errorADescription);
            }
            return throwError(err.message);
          })
        ).subscribe((res: HttpResponse<ErrorMessage>) => {
          console.log('res.body ------------> ' + res);
          console.log(res.body.errorCode);
          if (res.body.errorCode === '0') {
            this.ngOnInit();
            this.showSuccess('Organization Notified Successfully');
          } else {
            console.log(res.body.errorEDescription);
            this.showError(res.body.errorEDescription);
          }
        });
      },
      reject: () => {
        this.showError('Deleted Canceled');
      }
    });
  }
}
