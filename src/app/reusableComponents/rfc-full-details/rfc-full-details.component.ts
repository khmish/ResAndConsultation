import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DialogService, DynamicDialogConfig, MessageService} from 'primeng/api';
import {RfcFullDetailsServiceService} from '../../service/data/rfc-full-details-service.service';
import {HttpResponse} from '@angular/common/http';
import {ConsultationGetFullDataHttpBody} from '../../models/consultation-get-full-data-http-body';
import {BpmnWorkflowViewerComponent} from '../bpmn-workflow-viewer/bpmn-workflow-viewer.component';

export class RfcFullDetailsBody {
  constructor(
    public rfcId: string,
    public rfcGetFullDataHttpBody: Array<GetFullRfcDetailsDataBean>,
    public rfcRemarksHttpBody: Array<RemarksBodyBean>,
    public rfcMeetingsDetailsHttpBody: Array<MeetingHttpBody>,
    public errorMessage: ErrorMessage
  ) {

  }
}

// RfcFullDetails

export class GetFullRfcDetailsDataBean {
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
    public taskDefinitionEName: string,
    public consultationComiteeResult: string,
    public specialisedDepartment: string,
    public specDeptSuggestion: string
  ) {
  }
}


// Remark Details Class

export class RemarksBodyBean {
  constructor(
    public rfcId: string,
    public remarkHttpBodies: Array<RemarkHttpBodies>,
    public errorMessage: ErrorMessage
  ) {
  }
}

export class RemarkHttpBodies {
  constructor(
    public remarkId: string,
    public remarkDescription: string,
    public remarkUserId: string,
    public remarkUserName: string,
    public remarkDate: string,
    public processDefinitionKey: string,
    public processDefinitionAName: string,
    public processDefinitionEName: string,
    public taskDefinitionKey: string,
    public taskDefinitionAName: string,
    public taskDefinitionENamestring: string
  ) {
  }
}

// Meeting Details Class

export class RfcMeetingDetailsBody {
  constructor(
    public rfcId: string,
    public  meetingElementDetails: Array<MeetingElementDetails>,
    public errorMessage: ErrorMessage
  ) {
  }
}

export class MeetingElementDetails {
  constructor(public meetingElementId: string,
              public  meetingSubject: string,
              public  meetingElementAStatus: string,
              public  meetingElementEStatus: string,
              public  teamId: string,
              public  surveyId: string,
              public  originalSubSystemId: string,
              public  originalEntityId: string,
              public recommendationHttpBodies: Array<RecommendationHttpBody>,
              public meetingHttpBody: MeetingHttpBody,
              public errorMessage: ErrorMessage,
              public approved: false
  ) {
  }
}

export class RecommendationHttpBody {
  constructor(
    public recId: string,
    public recText: string) {
  }
}

export class MeetingHttpBody {
  constructor(
    public meetingId: string,
    public meetingSubject: string,
    public teamId: string,
    public deleted: string,
    public meetingDate: string,
    public meetingSTime: string,
    public meetingETime: string) {
  }
}

export class ErrorMessage {
  constructor(
    public errorCode: string,
    public errorADescription: string,
    public errorEDescription: string
  ) {
  }
}

@Component({
  selector: 'app-rfc-full-details',
  templateUrl: './rfc-full-details.component.html',
  styleUrls: ['./rfc-full-details.component.scss'],
  providers: [DialogService]
})
export class RfcFullDetailsComponent implements OnInit, OnChanges {

  // Meeting Details

  rfcIdFullDetails: string;
  @Input() rfcFullDetailsChild: string;


  rfcFullDetailsBody: GetFullRfcDetailsDataBean;

  meetingElementBody: RfcMeetingDetailsBody;
  meetingElementDetails: Array<MeetingElementDetails>;
  recommendationHttpBodies: Array<RecommendationHttpBody>;
  meetingHttpBody: MeetingHttpBody;


  // Remark Details

  remarkBody: RemarksBodyBean;
  remarkDetails: RemarkHttpBodies[];
  cols: any[];
  rfcIdRemark: string;
  @Input() remarkDetailsChild: string;
  selectedRemarkRow: RemarkHttpBodies;


  orgName: string;
  rfcTitle: string;
  rfcDescription: string;
  fieldArabicDescription: string;
  specialisedDepartment: string;
  orgContactName: string;
  orgContactJob: string;
  orgContactPhone: string;
  orgContactEmail: string;
  specDeptSuggestion: string;
  consultationComiteeResult: string;

  workflowId: string;
  taskId: string;

  // tslint:disable-next-line:max-line-length
  constructor(private messageService: MessageService, private rfcFullDetailsService: RfcFullDetailsServiceService, public config: DynamicDialogConfig,
              public dialogService: DialogService) {
  }

  ngOnInit() {
    console.log('this.rfcId ---------------------------' + this.config.data.rfcId);
    // console.log('this.rfcFullDetailsChild.rfcId' + this.rfcFullDetailsChild);
    this.rfcIdFullDetails = this.config.data.rfcId;
    console.log('this.rfcId : ' + this.rfcIdFullDetails);
    if (this.rfcIdFullDetails !== null) {
      this.rfcFullDetailsService.getFullRfcDetails(this.rfcIdFullDetails).subscribe((res: HttpResponse<any>) => {

        console.log(res.body);

        this.rfcFullDetailsBody = res.body.rfcGetFullDataHttpBody;
        this.meetingElementBody = res.body.rfcMeetingsDetailsHttpBody;
        this.remarkBody = res.body.rfcRemarksHttpBody;


        console.log('res --------> ' + this.rfcFullDetailsBody);
        console.log('res --------> ' + this.meetingElementBody);
        console.log('res --------> ' + this.remarkBody);

        this.orgName = this.rfcFullDetailsBody != null ? this.rfcFullDetailsBody.orgArabicName : null;
        this.rfcTitle = this.rfcFullDetailsBody != null ? this.rfcFullDetailsBody.rfcTitle : null;
        this.rfcDescription = this.rfcFullDetailsBody != null ? this.rfcFullDetailsBody.rfcDescription : null;
        this.fieldArabicDescription = this.rfcFullDetailsBody != null ? this.rfcFullDetailsBody.fieldArabicDescription : null;
        this.specialisedDepartment = this.rfcFullDetailsBody != null ? this.rfcFullDetailsBody.specialisedDepartment : null;

        this.orgContactName = this.rfcFullDetailsBody != null ? this.rfcFullDetailsBody.orgContactName : null;
        this.orgContactJob = this.rfcFullDetailsBody != null ? this.rfcFullDetailsBody.orgContactJob : null;
        this.orgContactPhone = this.rfcFullDetailsBody != null ? this.rfcFullDetailsBody.orgContactPhone : null;
        this.orgContactEmail = this.rfcFullDetailsBody != null ? this.rfcFullDetailsBody.orgContactEmail : null;

        this.specDeptSuggestion = this.rfcFullDetailsBody != null ? this.rfcFullDetailsBody.specDeptSuggestion : null;
        this.consultationComiteeResult = this.rfcFullDetailsBody != null ? this.rfcFullDetailsBody.consultationComiteeResult : null;

        if (this.meetingElementBody.errorMessage.errorCode === '0') {
          this.meetingElementDetails = this.meetingElementBody.meetingElementDetails;
          console.log(this.meetingElementDetails);
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.meetingElementDetails.length; i++) {
            this.recommendationHttpBodies = this.meetingElementDetails[i].recommendationHttpBodies;
            this.meetingHttpBody = this.meetingElementDetails[i].meetingHttpBody;
          }
        }

        if (this.remarkBody.errorMessage.errorCode === '0') {
          this.remarkDetails = this.remarkBody.remarkHttpBodies;
          this.cols = [
            {field: 'remarkDate', header: 'Date'},
            {field: 'remarkDescription', header: 'Description'}
          ];
        } else {
          console.log(this.remarkBody.errorMessage.errorEDescription);
          this.showError(this.remarkBody.errorMessage.errorEDescription);
        }

      }, error => {
        // this.showError('Service is down');
      });
    }
  }

  showSuccess(successMessage: string) {
    this.messageService.add({severity: 'success', summary: 'Success Message', detail: successMessage});
  }

  showError(errorMessage: string) {
    this.messageService.add({severity: 'error', summary: 'Error Message', detail: errorMessage});
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changed----------------> ' + changes.toString());
    this.ngOnInit();
  }

  showBpmnWorkflow(selCon: RemarkHttpBodies) {
    this.selectedRemarkRow = selCon;
    this.workflowId = this.selectedRemarkRow ? this.selectedRemarkRow.processDefinitionKey : 'none';
    this.taskId = this.selectedRemarkRow ? this.selectedRemarkRow.taskDefinitionKey : 'none';
    console.log('this.workflowId -------------> ' + this.workflowId);
    console.log('this.taskId -------------> ' + this.taskId);
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
    ref.onClose.subscribe(res => this.dialogService.dialogComponentRef.destroy());
  }
}
