import { Component, OnInit } from '@angular/core';
import {SpecDeptNewConsultationsComponent} from '../spec-dept-new-consultations.component';
import {SpecDeptService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../../../models/consultation-get-full-data-http-body';

@Component({
  selector: 'app-review-and-take-decision-by-committee',
  templateUrl: './review-and-take-decision-by-committee.component.html',
  styleUrls: ['./review-and-take-decision-by-committee.component.scss']
})
export class ReviewAndTakeDecisionByCommitteeComponent implements OnInit {

  selectedConstId: string;
  reviewAndTakeDecisionCommitteeRemark: '';
  selCAValue: string;

  constructor(private viewAllConsul: SpecDeptNewConsultationsComponent, private speDeptService: SpecDeptService) {
  }

  ngOnInit() {
    this.reviewAndTakeDecisionCommitteeRemark = null;
    this.selectedConstId = this.viewAllConsul.selRowForReview;
    console.log(this.selectedConstId);
    this.selCAValue = null;
  }

  onReset() {
    this.viewAllConsul.refreshPage();
  }

  onSubmit() {

    // tslint:disable-next-line:max-line-length
    if (this.reviewAndTakeDecisionCommitteeRemark === null || this.reviewAndTakeDecisionCommitteeRemark === '' || this.selCAValue === null) {
      this.viewAllConsul.showError('Please enter all values');
      return;
    }

    console.log(this.selCAValue === 'Yes' ? 'true' : 'false');

    this.speDeptService.reviewAndTakeDecisionByCommittee(this.selectedConstId,
      this.reviewAndTakeDecisionCommitteeRemark,
      this.selCAValue === 'Yes' ? 'true' : 'false').pipe(
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
