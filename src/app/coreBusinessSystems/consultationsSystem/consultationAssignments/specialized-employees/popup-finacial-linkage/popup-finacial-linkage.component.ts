import { Component, OnInit } from '@angular/core';
import {SpecializedEmployeesComponent} from '../specialized-employees.component';
import {SpecializedEmployeeService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/specialized-employee.service';
import {Message} from 'primeng/api';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-popup-finacial-linkage',
  templateUrl: './popup-finacial-linkage.component.html',
  styleUrls: ['./popup-finacial-linkage.component.scss']
})
export class PopupFinacialLinkageComponent implements OnInit {
  sendOk: boolean;
  serverUrl: string;
  msgs: Message[] = [];

  finLinkFileName: string;
  finLinkFileType: string;
  finLinkFileUploadSuccess: boolean;

  userId: string;
  constructor(private consultations: SpecializedEmployeesComponent, private specEmplService: SpecializedEmployeeService) { }

  ngOnInit() {
    this.sendOk = false;
    this.serverUrl = 'http://springdev.ipaedu.sa:8087/fileUpload';
    this.finLinkFileName = '';
    this.finLinkFileType = '';
    this.finLinkFileUploadSuccess = false;
    this.userId = sessionStorage.getItem('authenticatedUser');
  }
  onrecCalcUpload(event) {
    this.msgs = [];
    if (event.originalEvent.body.errorMessage.errorCode === '0') {

      this.finLinkFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.finLinkFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.finLinkFileUploadSuccess = true;
      if (this.finLinkFileUploadSuccess) {
        this.sendOk = true;
      }
    } else {
      this.finLinkFileUploadSuccess = false;
      this.sendOk = false;
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Decision File Upload Failed'});
    }
  }

  onReset() {
    this.consultations.refreshPage();
  }

  uploadCalcRecompense() {
    if (this.sendOk) {
      // tslint:disable-next-line:max-line-length
      this.specEmplService.c4Task01ProcessRecompenseCalculation(this.consultations.selRow, this.finLinkFileName, this.userId, this.finLinkFileType).pipe(
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
