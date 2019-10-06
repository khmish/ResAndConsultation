import { Component, OnInit } from '@angular/core';
import {ConsulGmNewConsultationsComponent} from '../../consul-gm-new-consultations/consul-gm-new-consultations.component';
import {ConsulDeputyService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-deputy.service';
import {Message} from 'primeng/api';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ConsulDeputyNewConsultationsComponent} from '../consul-deputy-new-consultations.component';

@Component({
  selector: 'app-popup-cdeputy-approve-financial-rec',
  templateUrl: './popup-cdeputy-approve-financial-rec.component.html',
  styleUrls: ['./popup-cdeputy-approve-financial-rec.component.scss']
})
export class PopupCdeputyApproveFinancialRecComponent implements OnInit {
  remark: string;
  allOk: boolean;
  userId: string;
  msgs: Message[] = [];
  constructor(private viewAllCon: ConsulDeputyNewConsultationsComponent, private consulDeputyService: ConsulDeputyService ) { }

  ngOnInit() {
    this.remark = '';
    this.userId = sessionStorage.getItem('authenticatedUser');
    this.allOk = false;
  }
  approveFinancialRecord() {
    // tslint:disable-next-line:max-line-length
    this.consulDeputyService.c4Task04DeputyApproveFinancialRec(this.viewAllCon.selRow, this.remark, this.userId).pipe(
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

  onReset() {
    this.viewAllCon.refreshPage();
  }

}
