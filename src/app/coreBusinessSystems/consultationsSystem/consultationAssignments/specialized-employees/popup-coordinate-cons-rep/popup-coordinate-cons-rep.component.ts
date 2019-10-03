import {Component, OnInit} from '@angular/core';
import {SpecializedEmployeesComponent} from '../specialized-employees.component';
import {SpecializedEmployeeService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/specialized-employee.service';
import {Message} from 'primeng/api';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-popup-coordinate-cons-rep',
  templateUrl: './popup-coordinate-cons-rep.component.html',
  styleUrls: ['./popup-coordinate-cons-rep.component.scss']
})
export class PopupCoordinateConsRepComponent implements OnInit {
  emplCode: string;
  employeeFullName: string;
  emplOk: boolean;
  sendOk: boolean;
  serverUrl: string;
  msgs: Message[] = [];

  coordPdfFileName: string;
  coordPdfFileType: string;
  coordPdfFileUploadSuccess: boolean;

  coordWordFileName: string;
  coordWordFileType: string;
  coordWordFileUploadSuccess: boolean;
  userId: string;

  constructor(private consultations: SpecializedEmployeesComponent, private specEmplService: SpecializedEmployeeService) {
  }

  ngOnInit() {
    this.emplCode = null;
    this.employeeFullName = null;
    this.emplOk = false;
    this.sendOk = false;
    this.serverUrl = 'http://springdev.ipaedu.sa:8087/fileUpload';
    this.coordPdfFileName = '';
    this.coordPdfFileType = '';
    this.coordPdfFileUploadSuccess = false;
    this.coordWordFileName = '';
    this.coordWordFileType = '';
    this.coordWordFileUploadSuccess = false;
    this.userId = sessionStorage.getItem('authenticatedUser');
  }

  oncoordPdfUpload(event) {
    this.msgs = [];
    if (event.originalEvent.body.errorMessage.errorCode === '0') {

      this.coordPdfFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.coordPdfFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.coordPdfFileUploadSuccess = true;
      if (this.coordPdfFileUploadSuccess && this.coordWordFileUploadSuccess && this.emplOk) {
        this.sendOk = true;
      }
    } else {
      this.coordPdfFileUploadSuccess = false;
      this.sendOk = false;
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Decision File Upload Failed'});
    }
  }

  oncoordWordUpload(event) {
    this.msgs = [];
    if (event.originalEvent.body.errorMessage.errorCode === '0') {

      this.coordWordFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.coordWordFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.coordWordFileUploadSuccess = true;
      if (this.coordPdfFileUploadSuccess && this.coordWordFileUploadSuccess && this.emplOk) {
        this.sendOk = true;
      }
    } else {
      this.coordWordFileUploadSuccess = false;
      this.sendOk = false;
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Decision File Upload Failed'});
    }
  }

  searchEmployee() {
    console.log(this.emplCode);

    if (this.emplCode === null) {
      this.consultations.showError('Please enter employee code');
      return;
    }

    this.specEmplService.searchEmployee(this.emplCode).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        if (!err.message.includes('OK')) {
          this.consultations.showError('Service is down');
        } else {
          this.consultations.showError(err.error.errorADescription);
        }
        return throwError(err.message);
      })
    ).subscribe((res: HttpResponse<any>) => {
      console.log('res.body ------------> ' + res);
      console.log(res.body);
      if (res.body.errorMessage.errorCode === '0') {
        this.employeeFullName = res.body.arabicFirstName + ' ' + res.body.arabicFamilyName;
        this.emplOk = true;
        if (this.coordPdfFileUploadSuccess && this.coordWordFileUploadSuccess && this.emplOk) {
          this.sendOk = true;
        }
      } else {
        console.log(res.body.errorMessage.errorEDescription);
        this.consultations.showError(res.body.errorMessage.errorEDescription);
        this.emplOk = false;
        this.sendOk = false;
      }
    });
  }

  onReset() {
    this.consultations.refreshPage();
  }

  uploadCoord() {
    if (this.sendOk) {
      // tslint:disable-next-line:max-line-length
      this.specEmplService.c3Task02SendReportsToDesigner(this.consultations.selRow, this.emplCode, this.coordPdfFileName, this.coordWordFileName, this.coordPdfFileType,
        this.coordWordFileType, this.userId).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          if (!err.message.includes('OK')) {
            this.consultations.showError('Service is down');
          } else {
            this.consultations.showError(err.error.errorADescription);
          }
          return throwError(err.message);
        })
      ).subscribe(
        (res: HttpResponse<any>) => {
          console.log(res.body);
          if (res.body.errorCode === '0') {
            this.consultations.refreshPage();
            this.consultations.ngOnInit();
            this.consultations.showSuccess('Reviewed Successfully');
          } else {
            console.log(res.body.errorEDescription);
            this.consultations.showError(res.body.errorEDescription);
          }
        }
      );

    } else {
      this.consultations.showError('Error while uploading docs');
    }
  }

}
