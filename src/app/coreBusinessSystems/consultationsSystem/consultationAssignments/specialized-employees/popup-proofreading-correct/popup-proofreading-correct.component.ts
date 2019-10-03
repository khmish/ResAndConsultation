import { Component, OnInit } from '@angular/core';
import {SpecializedEmployeesComponent} from '../specialized-employees.component';
// tslint:disable-next-line:max-line-length
import {SpecializedEmployeeService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/specialized-employee.service';
import {Message} from 'primeng/api';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-popup-proofreading-correct',
  templateUrl: './popup-proofreading-correct.component.html',
  styleUrls: ['./popup-proofreading-correct.component.scss']
})
export class PopupProofreadingCorrectComponent implements OnInit {
  serverUrl: string;
  msgs: Message[] = [];
  proofFileName: string;
  proofFileType: string;
  proofFileUploadSuccess: boolean;
  proofFileOk: boolean;
  constructor(private consultations: SpecializedEmployeesComponent, private specEmplService: SpecializedEmployeeService) { }

  ngOnInit() {
    this.serverUrl = 'http://springdev.ipaedu.sa:8087/fileUpload';
    this.proofFileName = '';
    this.proofFileType = '';
    this.proofFileUploadSuccess = false;
    this.proofFileOk = false;
  }

  onPlanUpload(event) {
    this.msgs = [];
    if (event.originalEvent.body.errorMessage.errorCode === '0') {

      this.proofFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.proofFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.proofFileUploadSuccess = true;
      this.proofFileOk = true;
    } else {
      this.proofFileUploadSuccess = false;
      this.proofFileOk = false;
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Decision File Upload Failed'});
    }
  }

  onReset() {
    this.consultations.refreshPage();
  }

  uploadPlan() {
    if (this.proofFileUploadSuccess) {
      // tslint:disable-next-line:max-line-length
      this.specEmplService.c2Task11ReviewProofReadingRemarks(this.consultations.selRow, this.proofFileName, this.proofFileType, '4360916').pipe(
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
