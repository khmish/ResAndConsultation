import {Component, OnInit} from '@angular/core';
import {SystemFunctionDsQueryHttpBody} from '../../../../service/data/httpBodies/user-privilages-http-body.service';
import {ActivatedRoute} from '@angular/router';
import {UserAccessService} from '../../../../service/user-access.service';
import {DeputyNewrfcService} from '../../../../service/data/deputy-newrfc.service';
import {HttpResponse} from '@angular/common/http';
import {DialogService, MessageService, SelectItem} from 'primeng/api';
// tslint:disable-next-line:max-line-length
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NewRfcsDeputyReviewComponent} from './new-rfcs-deputy-review/new-rfcs-deputy-review.component';
import {AcceptRejectReviewComponent} from './accept-reject-review/accept-reject-review.component';
import {CommonMethods} from '../../../../commons/common-methods';
import {ConsultationGetFullDataHttpBody} from '../../../../models/consultation-get-full-data-http-body';
import {BpmnWorkflowViewerComponent} from '../../../../reusableComponents/bpmn-workflow-viewer/bpmn-workflow-viewer.component';

export class GetDeputyRfcDataBean {
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
  selector: 'app-deputy-new-rfcs',
  templateUrl: './deputy-new-rfcs.component.html',
  styleUrls: ['./deputy-new-rfcs.component.scss'],
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
  ], providers: [DialogService, MessageService, CommonMethods]
})
export class DeputyNewRfcsComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, public userAccessService: UserAccessService, private allDeputyService: DeputyNewrfcService,
              public dialogService: DialogService, private messageService: MessageService,
              private commonMethod: CommonMethods) {
  }

  systemFunctionDsQueryHttpBodies: Array<SystemFunctionDsQueryHttpBody>;

  allDeputyRfcs: GetDeputyRfcDataBean[];
  cols: any[];
  selectedRfc: GetDeputyRfcDataBean;

  selectedRfc1: GetDeputyRfcDataBean;

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
  finalGeneratedJSON = new Map();

  selectedRfcForRemark: string;
  remarksVisible;

  selectedRfcForFullDetails: string;
  taskDefinitionFilter: SelectItem[];
  processDefinitionFilter: SelectItem[];

  taskDefinitionFilterSplittedArray: string[];
  processDefinitionFilterSplittedArray: string[];

  workflowId: string;
  taskId: string;

  ngOnInit() {
    this.systemFunctionDsQueryHttpBodies = this.userAccessService.getSystemFunctionDsQueryHttpBody();
    // console.log(this.systemFunctionDsQueryHttpBodies);
    this.finalGeneratedJSON = this.commonMethod.createJSONFromString(this.systemFunctionDsQueryHttpBodies);

    console.log('this.finalGeneratedJSON ------------------>  ' + this.finalGeneratedJSON.size);

    for (let i = 0; i < this.finalGeneratedJSON.size; i++) {
      console.log('this.finalGeneratedJSON : ' + i + '-' + this.finalGeneratedJSON.get(i));
    }

    this.allDeputyService.sendJSONDataAndGetAllDeputyRfc(this.finalGeneratedJSON.get(0),
      this.finalGeneratedJSON.get(1),
      this.finalGeneratedJSON.get(2),
      this.finalGeneratedJSON.get(3)).subscribe((res: HttpResponse<any>) => {
      this.allDeputyRfcs = res.body.dsQueryResult;
      console.log(this.allDeputyRfcs);
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
  updateRfcReviewDeputy(selCon: GetDeputyRfcDataBean) {
    this.selectedRfc1 = selCon;
    this.selRow = this.selectedRfc1 ? this.selectedRfc1.rfcId : 'none';
    console.log(this.selRow);
    const ref = this.dialogService.open(NewRfcsDeputyReviewComponent, {
      header: 'Deputy Rfc Review',
      width: '450px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  updateReviewAfterGMReview(selCon: GetDeputyRfcDataBean) {
    this.selectedRfc1 = selCon;
    this.selRow = this.selectedRfc1 ? this.selectedRfc1.rfcId : 'none';
    console.log(this.selRow);
    const ref = this.dialogService.open(AcceptRejectReviewComponent, {
      header: 'Consultation GM Rfc Review',
      width: '500px',
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

  showRemarks(selCon: GetDeputyRfcDataBean) {
    this.selectedRfc1 = selCon;
    this.selRow = this.selectedRfc1 ? this.selectedRfc1.rfcId : 'none';
    console.log(this.selRow);
    // this.remarksVisible = true;
    // this.selectedRfcForRemark = this.selRow;
    this.selectedRfcForFullDetails = this.selRow;

  }
}
