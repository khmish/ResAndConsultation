import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewallconsultationserviceService} from '../../../../service/data/viewallconsultationservice.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DialogService, MessageService, SelectItem} from 'primeng/api';
import {ConsultationComponent} from './addNewRfcGM/consultation.component';
import {StudyneedandbusscenterComponent} from './studyneedandbusscenter/studyneedandbusscenter.component';
import {SystemFunctionDsQueryHttpBody} from '../../../../service/data/httpBodies/user-privilages-http-body.service';
import {UserAccessService} from '../../../../service/user-access.service';
import {HttpResponse} from '@angular/common/http';
// tslint:disable-next-line:max-line-length
import {CreateConsultationRecordService} from '../../../../service/data/create-consultation-record.service';
import {RfcFullDetailsComponent} from '../../../../reusableComponents/rfc-full-details/rfc-full-details.component';
// tslint:disable-next-line:max-line-length
import {ReviewResultAndFinalDecisionRemarksComponent} from './review-result-and-final-decision-remarks/review-result-and-final-decision-remarks.component';
import {CommonMethods} from '../../../../commons/common-methods';
import {ConsultationGetFullDataHttpBody} from '../../../../models/consultation-get-full-data-http-body';
import {BpmnWorkflowViewerComponent} from '../../../../reusableComponents/bpmn-workflow-viewer/bpmn-workflow-viewer.component';

export class GetAllRfcDataBean {
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
  selector: 'app-viewallconsultation',
  templateUrl: './viewallconsultation.component.html',
  styleUrls: ['./viewallconsultation.component.scss'],
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
  providers: [DialogService, MessageService, RfcFullDetailsComponent, CommonMethods]
})
export class ViewallconsultationComponent implements OnInit, OnDestroy {

  allConsultations: GetAllRfcDataBean[];

  cols: any[];

  selectedConsultation: GetAllRfcDataBean;

  selectedConsultation1: GetAllRfcDataBean;

  selRow: string;
  display = false;

  systemFunctionDsQueryHttpBodies: Array<SystemFunctionDsQueryHttpBody>;
  finalGeneratedJSON = new Map();

  selectedRfcForFullDetails: string;
  taskDefinitionFilter: SelectItem[];
  processDefinitionFilter: SelectItem[];

  taskDefinitionFilterSplittedArray: string[];
  processDefinitionFilterSplittedArray: string[];

  workflowId: string;
  taskId: string;
  // tslint:disable-next-line:max-line-length
  constructor(private messageService: MessageService, private allRfcClient: ViewallconsultationserviceService, public dialogService: DialogService, public userAccessService: UserAccessService,
              private gmCreateRecordService: CreateConsultationRecordService,
              private commonMethod: CommonMethods) {
  }

  ngOnInit() {
    this.display = false;
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-blue sidebar-mini';

    this.systemFunctionDsQueryHttpBodies = this.userAccessService.getSystemFunctionDsQueryHttpBody();
    console.log(this.systemFunctionDsQueryHttpBodies);
    // tslint:disable-next-line:prefer-for-of

    this.finalGeneratedJSON = this.commonMethod.createJSONFromString(this.systemFunctionDsQueryHttpBodies);

    console.log('this.finalGeneratedJSON ------------------>  ' + this.finalGeneratedJSON.size);

    for (let i = 0; i < this.finalGeneratedJSON.size; i++) {
      console.log('this.finalGeneratedJSON : ' + i + '-' + this.finalGeneratedJSON.get(i));
    }

    this.allRfcClient.sendJSONDataAndGetAllGMRfc(this.finalGeneratedJSON.get(0),
      this.finalGeneratedJSON.get(1),
      this.finalGeneratedJSON.get(2),
      this.finalGeneratedJSON.get(3)).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.dsQueryResult);
      this.allConsultations = res.body.dsQueryResult;
      console.log('res.body -------' + this.allConsultations);
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

  ngOnDestroy(): void {
    document.body.className = '';
  }

  changeDocumentTheme(themeName: string) {
    window.dispatchEvent(new Event('resize'));
    document.body.className = themeName;
  }

  showNewConsultationDialog() {
    const ref = this.dialogService.open(ConsultationComponent, {
      header: 'Add New Consultation',
      // width: '100%',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }
  showBpmnWorkflow(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsultation1 = selCon;
    this.workflowId = this.selectedConsultation1 ? this.selectedConsultation1.processDefinitionKey : 'none';
    this.taskId = this.selectedConsultation1 ? this.selectedConsultation1.taskDefinitionKey : 'none';
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

  updateNeedStudyAndBussCenter(selCon: GetAllRfcDataBean) {
    this.selectedConsultation1 = selCon;
    this.selRow = this.selectedConsultation1 ? this.selectedConsultation1.rfcId : 'none';
    console.log(this.selRow);
    const ref = this.dialogService.open(StudyneedandbusscenterComponent, {
      header: 'Need Study And BussCenter',
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

  reviewAndTakeFinalDecision(selCon: GetAllRfcDataBean) {
    this.selectedConsultation1 = selCon;
    this.selRow = this.selectedConsultation1 ? this.selectedConsultation1.rfcId : 'none';
    console.log(this.selRow);
    const ref = this.dialogService.open(ReviewResultAndFinalDecisionRemarksComponent, {
      header: 'Review',
      width: '500px',
      contentStyle: {
        height: '250px', overflow: 'auto'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  showRemarks(selCon: GetAllRfcDataBean) {
    this.selectedConsultation1 = selCon;
    this.selRow = this.selectedConsultation1 ? this.selectedConsultation1.rfcId : 'none';
    console.log(this.selRow);
    // this.remarksVisible = true;
    // this.selectedRfcForRemark = this.selRow;
    this.selectedRfcForFullDetails = this.selRow;

  }

  createConsultationRecordFinal(selCon: GetAllRfcDataBean) {
    this.selectedConsultation1 = selCon;
    this.selRow = this.selectedConsultation1 ? this.selectedConsultation1.rfcId : 'none';
    console.log(this.selRow);
    this.gmCreateRecordService.createConsultationRecord(this.selRow).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.errorCode);
      if (res.body.errorCode === '0') {
        this.ngOnInit();
        this.showSuccess('Consultation record created Successfully');
      } else {
        console.log(res.body.errorEDescription);
        this.showError(res.body.errorEDescription);
      }
    }, error => {
      this.showError('Service is down');
    });

    this.ngOnInit();
  }
}
