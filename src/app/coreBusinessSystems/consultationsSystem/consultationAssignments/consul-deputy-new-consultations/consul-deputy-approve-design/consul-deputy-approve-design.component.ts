import { Component, OnInit } from '@angular/core';
import {ConsulGmNewConsultationsComponent} from '../../consul-gm-new-consultations/consul-gm-new-consultations.component';
// tslint:disable-next-line:max-line-length
import {ConsulDeputyService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-deputy.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-consul-deputy-approve-design',
  templateUrl: './consul-deputy-approve-design.component.html',
  styleUrls: ['./consul-deputy-approve-design.component.scss']
})
export class ConsulDeputyApproveDesignComponent implements OnInit {
  remark: string;
  allOk: boolean;
  userId: string;
  msgs: Message[] = [];

  constructor(private viewAllCon: ConsulGmNewConsultationsComponent, private consulDeputyService: ConsulDeputyService ) { }

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
    this.consulDeputyService.c3Task07ConsDeputyDesignApproval(this.viewAllCon.selRow, true, this.remark, this.userId).pipe(
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
      this.consulDeputyService.c3Task07ConsDeputyDesignApproval(this.viewAllCon.selRow, false, this.remark, this.userId).pipe(
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
