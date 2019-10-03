import {Component, OnInit} from '@angular/core';
import {ConsulGmNewConsultationsComponent} from '../consul-gm-new-consultations.component';
// tslint:disable-next-line:max-line-length
import {ConsulGmService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-gm.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-popup-gm-approve-design',
  templateUrl: './popup-gm-approve-design.component.html',
  styleUrls: ['./popup-gm-approve-design.component.scss']
})
export class PopupGmApproveDesignComponent implements OnInit {
  remark: string;
  allOk: boolean;
  userId: string;
  msgs: Message[] = [];

  constructor(private viewAllCon: ConsulGmNewConsultationsComponent, private consulGmService: ConsulGmService) {
  }

  ngOnInit() {
    this.remark = '';
    this.userId = sessionStorage.getItem('authenticatedUser');
    this.allOk = false;
  }
  onReset() {
    this.viewAllCon.refreshPage();
  }
  approveDesign() {
    // tslint:disable-next-line:max-line-length
    this.consulGmService.c3Task05ConsGMReviewDesignedReport(this.viewAllCon.selRow, true, this.remark, this.userId).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        if (!err.message.includes('OK')) {
          this.viewAllCon.showError('Service is down');
        } else {
          this.viewAllCon.showError(err.error.errorADescription);
        }
        return throwError(err.message);
      })
    ).subscribe(
      (res: HttpResponse<any>) => {
        console.log(res.body);
        if (res.body.errorCode === '0') {
          this.viewAllCon.refreshPage();
          this.viewAllCon.ngOnInit();
          this.viewAllCon.showSuccess('Reviewed Successfully');
        } else {
          console.log(res.body.errorEDescription);
          this.viewAllCon.showError(res.body.errorEDescription);
        }
      }
    );
  }

  disapproveDesign() {
    if (!(this.remark === '')) {
      // tslint:disable-next-line:max-line-length
      this.consulGmService.c3Task05ConsGMReviewDesignedReport(this.viewAllCon.selRow, false, this.remark, this.userId).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          if (!err.message.includes('OK')) {
            this.viewAllCon.showError('Service is down');
          } else {
            this.viewAllCon.showError(err.error.errorADescription);
          }
          return throwError(err.message);
        })
      ).subscribe(
        (res: HttpResponse<any>) => {
          console.log(res.body);
          if (res.body.errorCode === '0') {
            this.viewAllCon.refreshPage();
            this.viewAllCon.ngOnInit();
            this.viewAllCon.showSuccess('Reviewed Successfully');
          } else {
            console.log(res.body.errorEDescription);
            this.viewAllCon.showError(res.body.errorEDescription);
          }
        }
      );
    } else {
      this.viewAllCon.showError('Error while uploading docs');
    }
  }

}
