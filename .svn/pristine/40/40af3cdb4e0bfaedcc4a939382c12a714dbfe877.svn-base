import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  ActivityAssignmentResponseHttpBody,
  AssignmentWithRolesHttpBody,
  ConsultationGetFullDataHttpBody,
  ErrorMessage
} from '../../models/consultation-get-full-data-http-body';
import {ConsulFullDetailsService} from '../../service/data/consul-full-details.service';
import {HttpResponse} from '@angular/common/http';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-consultation-full-details',
  templateUrl: './consultation-full-details.component.html',
  styleUrls: ['./consultation-full-details.component.scss']
})
export class ConsultationFullDetailsComponent implements OnInit, OnChanges {

  @Input() consultationFullDetailsChild: string;

  consulFullDetailsBody: ConsultationGetFullDataHttpBody;
  activityAssignmentResponseHttpBodies: Array<ActivityAssignmentResponseHttpBody>;
  assignmentWithRolesHttpBodies: Array<AssignmentWithRolesHttpBody>;
  errorMessage: ErrorMessage;

  consulId: string;

  constructor(private consulFullDetailsService: ConsulFullDetailsService, private messageService: MessageService) {
  }

  ngOnInit() {
    console.log('this.consultationFullDetailsChild.rfcId' + this.consultationFullDetailsChild);
    this.consulId = this.consultationFullDetailsChild;
    if (this.consulId !== null) {
      this.consulFullDetailsService.getConsulFullDetails(this.consulId).subscribe((res: HttpResponse<any>) => {
        console.log(res.body);
        this.errorMessage = res.body.errorMessage;
        if (this.errorMessage.errorCode === '0') {
          this.consulFullDetailsBody = res.body.consultationGetFullDataHttpBody;
          this.activityAssignmentResponseHttpBodies = res.body.activityAssignmentResponseHttpBodies;

          console.log('res --------> ' + this.consulFullDetailsBody);
          console.log('res --------> ' + this.activityAssignmentResponseHttpBodies);

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.activityAssignmentResponseHttpBodies.length; i++) {
            this.errorMessage = this.activityAssignmentResponseHttpBodies[i].errorMsg;
            if (this.errorMessage.errorCode === '0') {
              this.assignmentWithRolesHttpBodies = this.activityAssignmentResponseHttpBodies[i].assignmentWithRolesHttpBodies;
            }
          }
        } else {
          this.showError('Service is down');
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
