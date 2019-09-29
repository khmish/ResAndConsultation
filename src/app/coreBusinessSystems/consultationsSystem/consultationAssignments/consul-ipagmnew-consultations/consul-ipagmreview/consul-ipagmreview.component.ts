import {Component, OnInit} from '@angular/core';
import {ConsulIPAGMNewConsultationsComponent} from '../consul-ipagmnew-consultations.component';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ConsulIPAGMService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-ipagm.service';

@Component({
  selector: 'app-consul-ipagmreview',
  templateUrl: './consul-ipagmreview.component.html',
  styleUrls: ['./consul-ipagmreview.component.scss']
})
export class ConsulIPAGMReviewComponent implements OnInit {
  consulIPAGmRemarks: string;
  selectedConsulId: string;

  constructor(private viewAllCon: ConsulIPAGMNewConsultationsComponent, private ipaGMServ: ConsulIPAGMService) {
  }

  ngOnInit() {
    this.selectedConsulId = this.viewAllCon.selRow;
    this.consulIPAGmRemarks = null;
  }

  onSubmit() {
    if (this.consulIPAGmRemarks === null || this.consulIPAGmRemarks === '') {
      this.viewAllCon.showError('Please enter remark');
      return;
    } else {
      this.ipaGMServ.reviewConsultation(this.selectedConsulId, this.consulIPAGmRemarks).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          if (!err.message.includes('OK')) {
            this.viewAllCon.showError('Service is down');
          } else {
            this.viewAllCon.showError(err.error.errorADescription);
          }
          return throwError(err.message);
        })
      ).subscribe((res: HttpResponse<any>) => {
        console.log('createTeams -------------> ' + res.body);
        if (res.body.errorCode === '0') {
          this.viewAllCon.showSuccess('Reviewed Successful');
          this.viewAllCon.refreshPage();
          this.viewAllCon.ngOnInit();
        } else {
          console.log(res.body.errorEDescription);
          this.viewAllCon.showError(res.body.errorEDescription);
        }
      });
    }
  }

  onReset() {
    this.viewAllCon.refreshPage();
  }
}
