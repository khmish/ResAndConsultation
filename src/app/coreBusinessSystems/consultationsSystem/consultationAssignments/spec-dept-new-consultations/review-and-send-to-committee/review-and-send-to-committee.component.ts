import {Component, OnInit} from '@angular/core';
import {SpecDeptNewConsultationsComponent} from '../spec-dept-new-consultations.component';
// tslint:disable-next-line:max-line-length
import {SpecDeptService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../../../models/consultation-get-full-data-http-body';

@Component({
  selector: 'app-review-and-send-to-committee',
  templateUrl: './review-and-send-to-committee.component.html',
  styleUrls: ['./review-and-send-to-committee.component.scss']
})
export class ReviewAndSendToCommitteeComponent implements OnInit {


  selectedConstId: string;
  gmRemarksForCommittee: '';

  constructor(private viewAllConsul: SpecDeptNewConsultationsComponent, private speDeptService: SpecDeptService) {
  }

  ngOnInit() {
    this.gmRemarksForCommittee = null;
    this.selectedConstId = this.viewAllConsul.selMemberRow;
    console.log(this.selectedConstId);
  }

  onReset() {
    this.viewAllConsul.refreshPage();
  }

  onSubmit() {
    // if (this.gmRemarksForCommittee === null || this.gmRemarksForCommittee === '') {
    //   this.viewAllConsul.showError('Please enter remarks');
    //   return;
    // }
    this.speDeptService.reviewAndSendToCommittee(this.selectedConstId, this.gmRemarksForCommittee).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        if (!err.message.includes('OK')) {
          this.viewAllConsul.showError('Service is down');
        } else {
          this.viewAllConsul.showError(err.error.errorADescription);
        }
        return throwError(err.message);
      })
    ).subscribe((res: HttpResponse<ErrorMessage>) => {
      console.log('res.body ------------> ' + res);
      console.log(res.body.errorCode);
      if (res.body.errorCode === '0') {
        this.viewAllConsul.dialogService.dialogComponentRef.destroy();
        this.viewAllConsul.ngOnInit();
        this.viewAllConsul.showSuccess('Review Added Successfully');
      } else {
        console.log(res.body.errorEDescription);
        this.viewAllConsul.showError(res.body.errorEDescription);
      }
    });
  }
}
