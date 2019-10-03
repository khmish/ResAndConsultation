import {Component, OnInit} from '@angular/core';
import {SpecializedEmployeesComponent} from '../specialized-employees.component';
import {SpecializedEmployeeService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/specialized-employee.service';
import {Message} from 'primeng/api';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-popup-design-cons-rep',
  templateUrl: './popup-design-cons-rep.component.html',
  styleUrls: ['./popup-design-cons-rep.component.scss']
})
export class PopupDesignConsRepComponent implements OnInit {
  serverUrl: string;
  msgs: Message[] = [];
  designFileName: string;
  designFileType: string;
  designFileUploadSuccess: boolean;
  designFileOk: boolean;
  userId: string;

  constructor(private consultations: SpecializedEmployeesComponent, private specEmplService: SpecializedEmployeeService) {
  }

  ngOnInit() {
    this.serverUrl = 'http://springdev.ipaedu.sa:8087/fileUpload';
    this.designFileName = '';
    this.designFileType = '';
    this.designFileUploadSuccess = false;
    this.designFileOk = false;
    this.userId = sessionStorage.getItem('authenticatedUser');
  }

  onPlanUpload(event) {
    this.msgs = [];
    if (event.originalEvent.body.errorMessage.errorCode === '0') {

      this.designFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.designFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.designFileUploadSuccess = true;
      this.designFileOk = true;
    } else {
      this.designFileUploadSuccess = false;
      this.designFileOk = false;
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Decision File Upload Failed'});
    }
  }

  onReset() {
    this.consultations.refreshPage();
  }

  uploadPlan() {
    if (this.designFileUploadSuccess) {
      // tslint:disable-next-line:max-line-length
      this.specEmplService.c3Task03SendDesignedReport(this.consultations.selRow, this.designFileName, this.userId, this.designFileType).pipe(
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
