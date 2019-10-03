import { Component, OnInit } from '@angular/core';
import {ConsulTeamPresidentComponent} from '../../consul-team-president/consul-team-president.component';
// tslint:disable-next-line:max-line-length
import {ConsulTeamPresedentService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-team-presedent.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {SpecDeptNewConsultationsComponent} from '../spec-dept-new-consultations.component';
// tslint:disable-next-line:max-line-length
import {SpecDeptService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept.service';

@Component({
  selector: 'app-popup-send-proofreading',
  templateUrl: './popup-send-proofreading.component.html',
  styleUrls: ['./popup-send-proofreading.component.scss']
})
export class PopupSendProofreadingComponent implements OnInit {
  emplCode: string;
  employeeFullName: string;
  sendOk: boolean;
  specDeptMgrRemarks: string;
  constructor(private viewAllConsul: SpecDeptNewConsultationsComponent, private speDeptService: SpecDeptService) { }

  ngOnInit() {
    this.emplCode = null;
    this.employeeFullName = null;
    this.sendOk = false;
    this.specDeptMgrRemarks = null;
  }

  onReset() {
    this.viewAllConsul.refreshPage();
  }
  searchEmployee() {
    console.log(this.emplCode);

    if (this.emplCode === null) {
      this.viewAllConsul.showError('Please enter employee code');
      return;
    }

    this.speDeptService.searchEmployee(this.emplCode).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        if (!err.message.includes('OK')) {
          this.viewAllConsul.showError('Service is down');
        } else {
          this.viewAllConsul.showError(err.error.errorADescription);
        }
        return throwError(err.message);
      })
    ).subscribe((res: HttpResponse<any>) => {
      console.log('res.body ------------> ' + res);
      console.log(res.body);
      if (res.body.errorMessage.errorCode === '0') {
        this.employeeFullName = res.body.arabicFirstName + ' ' + res.body.arabicFamilyName;
        this.sendOk = true;
      } else {
        console.log(res.body.errorMessage.errorEDescription);
        this.viewAllConsul.showError(res.body.errorMessage.errorEDescription);
        this.sendOk = false;
      }
    });
  }

  sendProofReading() {
    if (this.sendOk) {
      // tslint:disable-next-line:max-line-length
      this.speDeptService.c2Task08SendForProofreading(this.viewAllConsul.selRow, this.specDeptMgrRemarks, '4360916', this.emplCode).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          if (!err.message.includes('OK')) {
            this.viewAllConsul.showError('Service is down');
          } else {
            this.viewAllConsul.showError(err.error.errorADescription);
          }
          return throwError(err.message);
        })
      ).subscribe(
        (res: HttpResponse<any>) => {
          console.log(res.body);
          if (res.body.errorCode === '0') {
            this.viewAllConsul.refreshPage();
            this.viewAllConsul.ngOnInit();
            this.viewAllConsul.showSuccess('Reviewed Successfully');
          } else {
            console.log(res.body.errorEDescription);
            this.viewAllConsul.showError(res.body.errorEDescription);
          }
        }
      );

    } else {
      this.viewAllConsul.showError('Error while uploading docs');
    }
  }

}
