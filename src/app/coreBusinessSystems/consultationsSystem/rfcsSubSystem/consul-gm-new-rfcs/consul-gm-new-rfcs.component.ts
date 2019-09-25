import {Component, OnInit} from '@angular/core';
import {SystemFunctionDsQueryHttpBody} from '../../../../service/data/httpBodies/user-privilages-http-body.service';
import {ActivatedRoute} from '@angular/router';
import {UserAccessService} from '../../../../service/user-access.service';
import {NewConsulGmRfcServiceService} from '../../../../service/data/new-consul-gm-rfc-service.service';
import {HttpResponse} from '@angular/common/http';
import {DialogService, MessageService} from 'primeng/api';
import {ConsulGmRfcsReviewComponent} from './consul-gm-rfcs-review/consul-gm-rfcs-review.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {RfcFullDetailsComponent} from '../../../../reusableComponents/rfc-full-details/rfc-full-details.component';
import {ReviewAfterCommitteeRemarkComponent} from './review-after-committee-remark/review-after-committee-remark.component';
import {DeputyRejectRemarkComponent} from './deputy-reject-remark/deputy-reject-remark.component';
import {CreateConsultationRecordService} from '../../../../service/data/create-consultation-record.service';
import {CommonMethods} from '../../../../commons/common-methods';

export class GetConsulGmRfcDataBean {
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
  selector: 'app-consul-gm-new-rfcs',
  templateUrl: './consul-gm-new-rfcs.component.html',
  styleUrls: ['./consul-gm-new-rfcs.component.scss'],
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
export class ConsulGmNewRfcsComponent implements OnInit {

  systemFunctionDsQueryHttpBodies: Array<SystemFunctionDsQueryHttpBody>;

  cols: any[];
  allConsGMRfcs: GetConsulGmRfcDataBean[];

  selectedRfc: GetConsulGmRfcDataBean;
  selectedRfc1: GetConsulGmRfcDataBean;

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

  selectedRfcForRemark: string;
  remarksVisible;
  selectedRfcForFullDetails: string;

  finalGeneratedJSON = new Map();

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, public userAccessService: UserAccessService, public consulGmRfcService: NewConsulGmRfcServiceService,
              public dialogService: DialogService, private messageService: MessageService,
              private commonMethod: CommonMethods) {
  }

  ngOnInit() {
    this.selectedRfcForRemark = null;
    this.systemFunctionDsQueryHttpBodies = this.userAccessService.getSystemFunctionDsQueryHttpBody();
    // console.log(this.systemFunctionDsQueryHttpBodies);
    this.finalGeneratedJSON = this.commonMethod.createJSONFromString(this.systemFunctionDsQueryHttpBodies);

    console.log('this.finalGeneratedJSON ------------------>  ' + this.finalGeneratedJSON.size);

    for (let i = 0; i < this.finalGeneratedJSON.size; i++) {
      console.log('this.finalGeneratedJSON : ' + i + '-' + this.finalGeneratedJSON.get(i));
    }

    this.consulGmRfcService.sendJSONDataAndGetAllConsGMRfc(this.finalGeneratedJSON.get(0),
      this.finalGeneratedJSON.get(1),
      this.finalGeneratedJSON.get(2),
      this.finalGeneratedJSON.get(3)).subscribe((res: HttpResponse<any>) => {
      this.allConsGMRfcs = res.body.dsQueryResult;
      console.log(this.allConsGMRfcs);
    });


    this.cols = [
      {field: 'rfcTitle', header: 'الموضوع'},
      {field: 'fieldArabicDescription', header: 'مجال الاستشارة'},
      {field: 'orgArabicName', header: 'الجهة'},
      {field: 'taskDefinitionAName', header: 'الحالة'}
    ];
    this.selectedRfcForFullDetails = null;
  }

  updateConsulGmRfcReview(selCon: GetConsulGmRfcDataBean) {
    this.selectedRfc1 = selCon;
    this.selRow = this.selectedRfc1 ? this.selectedRfc1.rfcId : 'none';
    console.log(this.selRow);
    const ref = this.dialogService.open(ConsulGmRfcsReviewComponent, {
      header: 'Consultation GM Rfc Review',
      width: '500px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  updateConsulGmRfcReviewAfterCommitteeRemark(selCon: GetConsulGmRfcDataBean) {
    this.selectedRfc1 = selCon;
    this.selRow = this.selectedRfc1 ? this.selectedRfc1.rfcId : 'none';
    console.log(this.selRow);
    const ref = this.dialogService.open(ReviewAfterCommitteeRemarkComponent, {
      header: 'Consultation GM Rfc Review After Committee',
      width: '500px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  updateConsulGmRfcReviewAfterCommittee(selCon: GetConsulGmRfcDataBean) {
    this.selectedRfc1 = selCon;
    this.selRow = this.selectedRfc1 ? this.selectedRfc1.rfcId : 'none';
    console.log(this.selRow);
    const ref = this.dialogService.open(DeputyRejectRemarkComponent, {
      header: 'Consultation GM Rfc Review After Committee',
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

  loadRfcRemarkDetails($event) {
    // this.messageService.add({severity: 'info', summary: 'Rfc Id', detail: this.selectedConsultation.rfcId});
    const rfcId = this.selectedRfc.rfcId;
    this.selectedRfcForRemark = rfcId;

  }

  showRemarks(selCon: GetConsulGmRfcDataBean) {
    this.selectedRfc1 = selCon;
    this.selRow = this.selectedRfc1 ? this.selectedRfc1.rfcId : 'none';
    console.log(this.selRow);
    this.selectedRfcForFullDetails = this.selRow;

  }
}
