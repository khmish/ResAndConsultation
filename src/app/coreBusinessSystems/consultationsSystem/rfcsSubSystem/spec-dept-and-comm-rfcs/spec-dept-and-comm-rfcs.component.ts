import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DialogService, MessageService, SelectItem} from 'primeng/api';
import {SystemFunctionDsQueryHttpBody} from '../../../../service/data/httpBodies/user-privilages-http-body.service';
import {ActivatedRoute} from '@angular/router';
import {UserAccessService} from '../../../../service/user-access.service';
import {SpecDeptNewrfcsService} from '../../../../service/data/spec-dept-newrfcs.service';
import {HttpResponse} from '@angular/common/http';
import {RfcFullDetailsComponent} from '../../../../reusableComponents/rfc-full-details/rfc-full-details.component';
import {GetAllRfcDataBean} from '../gmNewRfcs/viewallconsultation.component';
import {CommonMethods} from '../../../../commons/common-methods';
import {RfcCommitteeManualApprovalComponent} from './rfc-committee-manual-approval/rfc-committee-manual-approval.component';
import {RfcCommitteeDecisionsService} from '../../../../service/data/rfc-committee-decisions.service';
import {GetdepartmentemployeesComponent} from './getdepartmentemployees/getdepartmentemployees.component';
import {SpecemplrfcreviewComponent} from './specemplrfcreview/specemplrfcreview.component';
import {ConsultationGetFullDataHttpBody} from '../../../../models/consultation-get-full-data-http-body';
import {BpmnWorkflowViewerComponent} from '../../../../reusableComponents/bpmn-workflow-viewer/bpmn-workflow-viewer.component';

export class GetSpecDeptAndCommRfcsDataBean {
  constructor(
    public rfcId: string,
    public rfcTitle: string,
    public rfcDescription: string,
    public fieldCode: string,
    public fieldArabicDescription: string,
    public fieldEnglishDescription: string,
    public orgId: string,
    public orgArabicName: string,
    public orgEnglishName: string,
    public orgContactName: string,
    public orgContactJob: string,
    public orgContactPhone: string,
    public orgContactEmail: string,
    public statusCode: string,
    public statusArabicDescription: string,
    public statusEnglishDescription: string,
    public processDefinitionKey: string,
    public processDefinitionAName: string,
    public processDefinitionEName: string,
    public taskDefinitionKey: string,
    public taskDefinitionAName: string,
    public taskDefinitionEName: string
  ) {
  }
}

@Component({
  selector: 'app-spec-dept-and-comm-rfcs',
  templateUrl: './spec-dept-and-comm-rfcs.component.html',
  styleUrls: ['./spec-dept-and-comm-rfcs.component.scss'],
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
  ], providers: [DialogService, MessageService, RfcFullDetailsComponent, CommonMethods]
})
export class SpecDeptAndCommRfcsComponent implements OnInit {

  systemFunctionDsQueryHttpBodies: Array<SystemFunctionDsQueryHttpBody>;

  cols: any[];
  allSpecDeptRfcs: GetSpecDeptAndCommRfcsDataBean[];

  selectedRfc: GetSpecDeptAndCommRfcsDataBean;
  selectedRfc1: GetSpecDeptAndCommRfcsDataBean;

  selRow: string;
  dsId: string;
  dsProcessVariables: string;
  dsProcessFilterFunctions: string;

  dsProcessVariablesSplitedArray: string[];
  dsProcessFilterFunctionsSplittedArray: string[];

  daFinalVariables = new Map();
  daFinalFilterFunctions = new Map();
  processDefinitionKey: string;

  taskDefinitionKeyIn: string;
  taskDefinitionKeyInBody: string;
  taskAssignee: string;
  taskUnAssignee: string;

  startOr: string;
  endOr: string;

  selectedRfcForFullDetails: string;

  departmentCode: string;

  finalGeneratedJSON = new Map();
  taskDefinitionFilter: SelectItem[];
  processDefinitionFilter: SelectItem[];

  taskDefinitionFilterSplittedArray: string[];
  processDefinitionFilterSplittedArray: string[];

  workflowId: string;
  taskId: string;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, public userAccessService: UserAccessService, public dialogService: DialogService,
              public specDeptNewRfcService: SpecDeptNewrfcsService, private messageService: MessageService,
              private commonMethod: CommonMethods, public allCommitteeDecisionService: RfcCommitteeDecisionsService) {
  }

  ngOnInit() {
    this.departmentCode = '0201610';
    this.systemFunctionDsQueryHttpBodies = this.userAccessService.getSystemFunctionDsQueryHttpBody();
    console.log(this.systemFunctionDsQueryHttpBodies);

    this.finalGeneratedJSON = this.commonMethod.createJSONFromString(this.systemFunctionDsQueryHttpBodies);

    console.log('this.finalGeneratedJSON ------------------>  ' + this.finalGeneratedJSON.size)

    for (let i = 0; i < this.finalGeneratedJSON.size; i++) {
      console.log('this.finalGeneratedJSON : ' + i + '-' + this.finalGeneratedJSON.get(i));
    }

    this.specDeptNewRfcService.sendJSONDataAndGetAllSpecDeptRfc(this.finalGeneratedJSON.get(0),
      this.finalGeneratedJSON.get(1),
      this.finalGeneratedJSON.get(2),
      this.finalGeneratedJSON.get(3)).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.dsQueryResult);
      this.allSpecDeptRfcs = res.body.dsQueryResult;
      console.log('res.body -------' + this.allSpecDeptRfcs);
      this.taskDefinitionFilterSplittedArray = res.body.aTaskDefinitionList.toString().split(',');
      this.processDefinitionFilterSplittedArray = res.body.aProcessDefinitionList.toString().split(',');

      this.taskDefinitionFilter = [
        {label: 'All', value: null}
      ];
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
      {field: 'rfcTitle', header: 'الموضوع'},
      {field: 'fieldArabicDescription', header: 'مجال الاستشارة'},
      {field: 'orgArabicName', header: 'الجهة'},
      {field: 'taskDefinitionAName', header: 'الحالة'}
    ];

    this.selectedRfcForFullDetails = null;

  }
  showBpmnWorkflow(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedRfc1 = selCon;
    this.workflowId = this.selectedRfc1 ? this.selectedRfc1.processDefinitionKey : 'none';
    this.taskId = this.selectedRfc1 ? this.selectedRfc1.taskDefinitionKey : 'none';
    console.log(this.workflowId);
    console.log(this.taskId);
    const myData = {
      processDefinitionKey: this.workflowId,
      taskDefinitionKey: this.taskId
    };
    const ref = this.dialogService.open(BpmnWorkflowViewerComponent, {
      data: myData,
      header: 'إجراء طلبات الاستشارات',
      width: '50%',
      contentStyle: {
        height: '600px', overflow: 'hidden'
      },
      closable: true
    });
    ref.onClose.subscribe(res => this.refreshPage());
  }
  assignRfcToEmployee(selCon: GetSpecDeptAndCommRfcsDataBean) {
    this.selectedRfc1 = selCon;
    this.selRow = this.selectedRfc1 ? this.selectedRfc1.rfcId : 'none';
    console.log(this.selRow);
    const ref = this.dialogService.open(GetdepartmentemployeesComponent, {
      header: 'Employees List',
      width: '350px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
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

  showRemarks(selCon: GetAllRfcDataBean) {
    this.selectedRfc1 = selCon;
    this.selRow = this.selectedRfc1 ? this.selectedRfc1.rfcId : 'none';
    console.log(this.selRow);
    this.selectedRfcForFullDetails = this.selRow;

  }

  updateSpecEmplRfcReview(selCon: GetSpecDeptAndCommRfcsDataBean) {
    this.selectedRfc1 = selCon;
    this.selRow = this.selectedRfc1 ? this.selectedRfc1.rfcId : 'none';
    console.log(this.selRow);
    const ref = this.dialogService.open(SpecemplrfcreviewComponent, {
      header: 'Consultation GM Rfc Review',
      width: '500px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  rfcManualProcess(selCon: GetSpecDeptAndCommRfcsDataBean) {
    this.selectedRfc1 = selCon;
    this.selRow = this.selectedRfc1 ? this.selectedRfc1.rfcId : 'none';
    console.log(this.selRow);
    const ref = this.dialogService.open(RfcCommitteeManualApprovalComponent, {
      header: 'Manual Approval',
      width: '450px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  rfcAutomaticProcess(selCon: GetSpecDeptAndCommRfcsDataBean) {
    this.selectedRfc1 = selCon;
    this.selRow = this.selectedRfc1 ? this.selectedRfc1.rfcId : 'none';
    console.log(this.selRow);
    this.allCommitteeDecisionService.automaticProcessApproval(this.selRow).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.errorCode);
      if (res.body.errorCode === '0') {
        this.ngOnInit();
        this.showSuccess('Consultation Approved');
      } else {
        console.log(res.body.errorEDescription);
        this.showError(res.body.errorEDescription);
      }
    }, error => {
      this.showError('Service is down');
    });
  }
}
