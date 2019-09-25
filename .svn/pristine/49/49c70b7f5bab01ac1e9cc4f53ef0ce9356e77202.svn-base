import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MessageService} from 'primeng/api';
import {RfcFullDetailsServiceService} from '../../service/data/rfc-full-details-service.service';
import {HttpResponse} from '@angular/common/http';

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
    public taskDefinitionEName: string
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
    public remarkDate: string) {
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
  styleUrls: ['./rfc-full-details.component.scss']
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

  constructor(private messageService: MessageService, private rfcFullDetailsService: RfcFullDetailsServiceService) {
  }

  ngOnInit() {
    console.log('this.rfcFullDetailsChild.rfcId' + this.rfcFullDetailsChild);
    this.rfcIdFullDetails = this.rfcFullDetailsChild;
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
}
