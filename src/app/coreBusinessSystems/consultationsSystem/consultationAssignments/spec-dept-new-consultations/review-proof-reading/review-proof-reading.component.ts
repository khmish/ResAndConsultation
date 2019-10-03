import {Component, OnInit} from '@angular/core';
import {SpecDeptNewConsultationsComponent} from '../spec-dept-new-consultations.component';
import {SpecDeptService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../../../models/consultation-get-full-data-http-body';

@Component({
  selector: 'app-review-proof-reading',
  templateUrl: './review-proof-reading.component.html',
  styleUrls: ['./review-proof-reading.component.scss']
})
export class ReviewProofReadingComponent implements OnInit {

  selectedConstId: string;
  gmRemarks: '';
  emplCode: string;
  selRMEValue: string;
  selRMValue: string;
  showRemarkType: boolean;
  employeeFullName: any;
  showRemark: boolean;
  sendOk: boolean;

  constructor(private viewAllConsul: SpecDeptNewConsultationsComponent, private speDeptService: SpecDeptService) {
  }

  ngOnInit() {
    this.gmRemarks = null;
    this.selectedConstId = this.viewAllConsul.selRowForReview;
    console.log(this.selectedConstId);
    this.emplCode = null;
    this.selRMValue = 'No';
    this.showRemarkType = false;
    this.showRemark = false;
    this.employeeFullName = null;
    this.sendOk = false;
    this.selRMEValue = null;
  }

  toogleRemark() {
    if (this.selRMEValue === 'Yes') {
      this.showRemark = true;
    } else if (this.selRMEValue === 'No') {
      this.showRemark = false;
      this.emplCode = null;
      this.selRMValue = 'No';
      this.employeeFullName = null;
    }
    this.showRemarkType = false;
    this.employeeFullName = null;
  }

  toogleRemarkType() {
    if (this.selRMValue === 'Yes') {
      this.showRemarkType = true;
    } else if (this.selRMValue === 'No') {
      this.showRemarkType = false;
      this.emplCode = null;
      this.employeeFullName = null;
    }
  }

  onReset() {
    this.viewAllConsul.refreshPage();
  }

  onSubmit() {
    console.log(this.gmRemarks);
    console.log(this.selectedConstId);
    console.log(this.selRMEValue === 'Yes' ? 'true' : 'false');
    console.log(this.selRMValue === 'Yes' ? 'true' : 'false');
    console.log(this.emplCode);
    if (this.selRMEValue === null) {
      this.viewAllConsul.showError('Please select if remark exists');
      return;
    }
    if (this.selRMValue === 'Yes' && (this.emplCode === null || this.emplCode === '')) {
      this.viewAllConsul.showError('Please select employee');
      return;
    }

    this.speDeptService.reviewProofReading(this.selectedConstId,
      this.selRMEValue === 'Yes' ? 'true' : 'false',
      this.selRMValue === 'Yes' ? 'true' : 'false',
      this.gmRemarks,
      this.emplCode).pipe(
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
        // this.sendOk = true;
      } else {
        console.log(res.body.errorMessage.errorEDescription);
        this.viewAllConsul.showError(res.body.errorMessage.errorEDescription);
        // this.sendOk = false;
      }
    });
  }
}
