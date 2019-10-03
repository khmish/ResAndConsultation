import { Component, OnInit } from '@angular/core';
import {ConsulGmNewConsultationsComponent} from '../consul-gm-new-consultations.component';
import {ConsulGmService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-gm.service';
import {Message} from 'primeng/api';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-popup-gm-rev-design',
  templateUrl: './popup-gm-rev-design.component.html',
  styleUrls: ['./popup-gm-rev-design.component.scss']
})
export class PopupGmRevDesignComponent implements OnInit {
  remark: string;
  allOk: boolean;
  userId: string;
  msgs: Message[] = [];
  constructor(private viewAllCon: ConsulGmNewConsultationsComponent, private consulGmService: ConsulGmService) { }

  ngOnInit() {
    this.remark = '';
    this.userId = sessionStorage.getItem('authenticatedUser');
    this.allOk = false;
  }
  onReset() {
    this.viewAllCon.refreshPage();
  }

  reviewDeputyDesign() {
    // tslint:disable-next-line:max-line-length
    this.consulGmService.c3Task08ConsGMReview(this.viewAllCon.selRow, this.remark, this.userId).pipe(
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

}
