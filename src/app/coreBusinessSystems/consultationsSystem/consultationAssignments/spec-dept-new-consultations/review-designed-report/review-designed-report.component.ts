import {Component, OnInit} from '@angular/core';
import {SpecDeptNewConsultationsComponent} from '../spec-dept-new-consultations.component';
import {SpecDeptService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../../../models/consultation-get-full-data-http-body';

@Component({
  selector: 'app-review-designed-report',
  templateUrl: './review-designed-report.component.html',
  styleUrls: ['./review-designed-report.component.scss']
})
export class ReviewDesignedReportComponent implements OnInit {
  selectedConstId: string;
  remarks: '';
  userId: string;

  constructor(private viewAllConsul: SpecDeptNewConsultationsComponent, private speDeptService: SpecDeptService) {
  }


  ngOnInit() {
    this.remarks = null;
    this.selectedConstId = this.viewAllConsul.selRowForReview;
    this.userId = sessionStorage.getItem('authenticatedUser');
  }

  onSubmit(approved: boolean) {
    console.log(this.remarks);
    console.log(this.selectedConstId);
    console.log(this.userId);

    this.speDeptService.reviewDesignedReport(this.selectedConstId,
      approved,
      this.remarks,
      this.userId).pipe(
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
        this.viewAllConsul.showSuccess('Reviewed Successfully');
      } else {
        console.log(res.body.errorEDescription);
        this.viewAllConsul.showError(res.body.errorEDescription);
      }
    });
  }

  onReset() {
    this.viewAllConsul.refreshPage();
  }

  onAccept() {
    this.onSubmit(true);
  }

  onReject() {
    if (this.remarks === null) {
      this.viewAllConsul.showError('Please enter the remark');
      return;
    } else {
      this.onSubmit(false);
    }
  }
}
