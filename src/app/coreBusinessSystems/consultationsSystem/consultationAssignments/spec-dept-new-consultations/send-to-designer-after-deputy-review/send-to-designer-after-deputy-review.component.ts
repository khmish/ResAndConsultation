import { Component, OnInit } from '@angular/core';
import {SpecDeptNewConsultationsComponent} from '../spec-dept-new-consultations.component';
import {SpecDeptService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../../../models/consultation-get-full-data-http-body';

@Component({
  selector: 'app-send-to-designer-after-deputy-review',
  templateUrl: './send-to-designer-after-deputy-review.component.html',
  styleUrls: ['./send-to-designer-after-deputy-review.component.scss']
})
export class SendToDesignerAfterDeputyReviewComponent implements OnInit {

  selectedConstId: string;
  gmRemark: '';
  userId: string;

  constructor(private viewAllConsul: SpecDeptNewConsultationsComponent, private speDeptService: SpecDeptService) {
  }


  ngOnInit() {
    this.gmRemark = null;
    this.selectedConstId = this.viewAllConsul.selRowForReview;
    this.userId = sessionStorage.getItem('authenticatedUser');
  }

  onSubmit() {
    console.log(this.gmRemark);
    console.log(this.selectedConstId);
    console.log(this.userId);

    this.speDeptService.sendToDesignerAfterDeputyReview(this.selectedConstId, this.gmRemark, this.userId).pipe(
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

  onReset() {
    this.viewAllConsul.refreshPage();
  }
}
