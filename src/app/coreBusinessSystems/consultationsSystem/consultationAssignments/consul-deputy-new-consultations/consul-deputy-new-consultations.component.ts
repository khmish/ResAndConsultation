// tslint:disable-next-line:max-line-length
import {Popup_upload_approval_assgin_teamComponent} from './popup_upload_approval_assgin_team/popup_upload_approval_assgin_team.component';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  DialogService,
  MessageService, SelectItem
} from 'primeng/api';
import {
  CommonMethods
} from '../../../../commons/common-methods';
import {
  DatePipe
} from '@angular/common';
import {
  ConsultationGetFullDataHttpBody,
  ConsultationDeputyReviewApproval,
  ConsultationDeputyPrepareDecisions1Task06,
  ConsultationDeputyPrepareDecisions1Task07
} from '../../../../models/consultation-get-full-data-http-body';
import {
  SystemFunctionDsQueryHttpBody
} from '../../../../service/data/httpBodies/user-privilages-http-body.service';
import {
  UserAccessService
} from '../../../../service/user-access.service';
import {
  GenerateJSONService
} from '../../../../service/data/generate-json.service';
import {
  HttpResponse,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  GetAllRfcDataBean
} from '../../rfcsSubSystem/gmNewRfcs/viewallconsultation.component';
import {AcceptRejectReviewComponent} from './accept-reject-review/accept-reject-review.component';
import {
  catchError
} from 'rxjs/operators';
import {
  error
} from 'util';
import {BpmnWorkflowViewerComponent} from '../../../../reusableComponents/bpmn-workflow-viewer/bpmn-workflow-viewer.component';
import {PopupGmApproveDesignComponent} from '../consul-gm-new-consultations/popup-gm-approve-design/popup-gm-approve-design.component';
import {ConsulDeputyApproveDesignComponent} from './consul-deputy-approve-design/consul-deputy-approve-design.component';
import {PopupCdeputyApproveFinancialRecComponent} from './popup-cdeputy-approve-financial-rec/popup-cdeputy-approve-financial-rec.component';
import {AttachDiagTeamDesicionComponent} from './attach-diag-team-desicion/attach-diag-team-desicion.component';

@Component({
  selector: 'app-consul-deputy-new-consultations',
  templateUrl: './consul-deputy-new-consultations.component.html',
  styleUrls: ['./consul-deputy-new-consultations.component.scss'],
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
export class ConsulDeputyNewConsultationsComponent implements OnInit {


  remark = '';
  taskDefKey;

  allConsultationsData: ConsultationGetFullDataHttpBody[];
  cols: any[];
  selectedConsData: ConsultationGetFullDataHttpBody;
  selectedConsData1: ConsultationGetFullDataHttpBody;

  selectedConsApproval: ConsultationDeputyReviewApproval;
  selectedConsDecisions6: ConsultationDeputyPrepareDecisions1Task06;
  selectedConsDecisions7: ConsultationDeputyPrepareDecisions1Task07;

  selRow: string;
  systemFunctionDsQueryHttpBodies: Array<SystemFunctionDsQueryHttpBody>;
  finalGeneratedJSON = new Map();

  selectedConsulForFullDetails: string;
  display: boolean;
  taskDefinitionFilter: SelectItem[];
  processDefinitionFilter: SelectItem[];

  taskDefinitionFilterSplittedArray: string[];
  processDefinitionFilterSplittedArray: string[];

  workflowId: string;
  taskId: string;
  acceptTask3Url = 'http://springdev.ipaedu.sa:8082/consultationDeputyReviewApprovalTask03';
  acceptTask6Url = 'http://springdev.ipaedu.sa:8082/consultationDeputyPrepareDecisions1Task06';
  acceptTask7Url = 'http://springdev.ipaedu.sa:8082/consultationDeputyPrepareDecisions1Task07';

  // tslint:disable-next-line:max-line-length
  constructor(private messageService: MessageService, public dialogService: DialogService,
              public userAccessService: UserAccessService, private commonMethod: CommonMethods,
              private generateDataService: GenerateJSONService, private datePipe: DatePipe,
              private http: HttpClient) {
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
    // console.log("selcon "+selCon);

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
  // updateRfcReviewDeputy(selCon: ConsultationGetFullDataHttpBody) {
  //   this.selectedConsData = selCon;
  //   console.log(this.selectedConsData);

  //   this.selRow = this.selectedConsData ? this.selectedConsData.rfcId : 'none';
  //   console.log(this.selRow);
  //   const ref = this.dialogService.open(AcceptRejectReviewComponent, {
  //     header: 'fewafdef',
  //     width: '450px',
  //     contentStyle: {
  //       'max-height': '80%', overflow: 'auto'
  //     },
  //     closable: false
  //   });

  //   ref.onClose.subscribe(res => this.refreshPage());
  // }

  refreshPage() {
    this.dialogService.dialogComponentRef.destroy();
  }

  showDialog(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    const ref = this.dialogService.open(AcceptRejectReviewComponent, {
      header: 'review',
      width: '450px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: true
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  closeDialog() {
    this.display = false;
  }

  // acceptRejectTask3(acceptPara: boolean) {

  //   this.selectedConsApproval = {
  //     constId: this.selRow,
  //     remark: this.remark,
  //     consulDeputyTeamsApproval: acceptPara,
  //     userId: sessionStorage.getItem('authenticatedUser')
  //   };
  //   console.log(this.selectedConsApproval);

  //   try {
  //     // synchronous operation
  //     this.http.post<any>(this.acceptTask3Url, this.selectedConsApproval)
  //     .subscribe(
  //       (data) => {
  //         // console.log("data "+data);

  //         this.showSuccess(data.errorADescription);
  //         this.ngOnInit();
  //       },
  //       (err: HttpErrorResponse) =>{
  //         // console.log("err "+err.error.errorADescription);
  //         this.showError(err.error.errorADescription);
  //       }
  //     );
  //   } catch (error) {


  //   }

  //   this.closeDialog();

  // }

  // acceptRejectTask6(acceptPara: boolean) {
  //   this.selectedConsDecisions6 = {
  //     constId: this.selRow,
  //     constAttachmentPath: this.remark,
  //     scientificAttachmentPath: 'acceptPara',
  //     attachmentType: sessionStorage.getItem('authenticatedUser')
  //   };
  //   console.log(this.selectedConsDecisions6);

  //   this.http.post(this.acceptTask6Url, this.selectedConsDecisions6).subscribe(
  //     data => {
  //       console.log(data);

  //     }
  //   );
  // }
  // acceptRejectTask7(acceptPara: boolean) {
  //   this.selectedConsDecisions7 = {
  //     constId: this.selRow,
  //     diagnosticAttachmentPath: this.remark,
  //     attachmentType: sessionStorage.getItem('authenticatedUser')
  //   };
  //   console.log(this.selectedConsDecisions7);

  //   this.http.post(this.acceptTask7Url, this.selectedConsDecisions7).subscribe(
  //     data => {
  //       console.log(data);

  //     }
  //   );
  // }

  showSuccess(successMessage: string) {
    this.messageService.add({severity: 'success', summary: 'Success Message', detail: successMessage});
  }

  showError(errorMessage: string) {
    this.messageService.add({severity: 'error', summary: 'Error Message', detail: errorMessage});
  }

  showUploadPopup(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    const ref = this.dialogService.open(Popup_upload_approval_assgin_teamComponent, {
      header: 'upload',
      width: '450px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: true
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }
  showApproveDesignPopup(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    const ref = this.dialogService.open(ConsulDeputyApproveDesignComponent, {
      header: 'upload',
      width: '450px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: true
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  showApproveFinRecPopup(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    const ref = this.dialogService.open(PopupCdeputyApproveFinancialRecComponent, {
      header: 'upload',
      width: '450px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: true
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  showUploadDialog(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    const ref = this.dialogService.open(AttachDiagTeamDesicionComponent, {
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
