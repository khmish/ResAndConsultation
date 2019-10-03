import { Component, OnInit } from '@angular/core';
import {SpecDeptNewConsultationsComponent} from '../spec-dept-new-consultations.component';
// tslint:disable-next-line:max-line-length
import {SpecDeptService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept.service';
import {DatePipe} from '@angular/common';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../../../models/consultation-get-full-data-http-body';

@Component({
  selector: 'app-popup-gm-send-recomp-calc',
  templateUrl: './popup-gm-send-recomp-calc.component.html',
  styleUrls: ['./popup-gm-send-recomp-calc.component.scss']
})
export class PopupGmSendRecompCalcComponent implements OnInit {
  selectedConstId: string;
  emplCode: string;
  employeeFullName: string;
  userId: string;
  sendOk: boolean;
  constructor(private viewAllConsul: SpecDeptNewConsultationsComponent, private specDeptService: SpecDeptService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.selectedConstId = this.viewAllConsul.selRowForReview;
    this.emplCode = null;
    this.employeeFullName = null;
    this.userId = sessionStorage.getItem('authenticatedUser');
    this.sendOk = false;
  }
  onReset() {
    this.viewAllConsul.refreshPage();
  }
  onSubmit() {
    if (!this.sendOk) {
      this.viewAllConsul.showError('Please select employee');
      return;
    }
    this.specDeptService.c3Task12SendForRecompanseCalc(this.selectedConstId, this.emplCode, this.userId).pipe(
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
  searchEmployee() {
    console.log(this.emplCode);

    if (this.emplCode === null) {
      this.viewAllConsul.showError('Please enter employee code');
      return;
    }
    this.specDeptService.searchEmployee(this.emplCode).pipe(
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
        this.sendOk = false;
        console.log(res.body.errorMessage.errorEDescription);
        this.viewAllConsul.showError(res.body.errorMessage.errorEDescription);
      }
    });
  }

}
