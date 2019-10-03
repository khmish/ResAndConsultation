import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ConsulTeamPresidentComponent} from '../consul-team-president.component';
import {ConsulTeamPresedentService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-team-presedent.service';

@Component({
  selector: 'app-popup-scientific-review-result',
  templateUrl: './popup-scientific-review-result.component.html',
  styleUrls: ['./popup-scientific-review-result.component.scss']
})
export class PopupScientificReviewResultComponent implements OnInit {
  serverUrl: string;
  msgs: Message[] = [];
  scienRepFileName: string;
  scienRepFileType: string;
  scienRepFileUploadSuccess: boolean;
  scienRepFileOk: boolean;
  allOk: boolean;
  constructor(private consultations: ConsulTeamPresidentComponent, private consulTeamPresService: ConsulTeamPresedentService) { }

  ngOnInit() {
    this.serverUrl = 'http://springdev.ipaedu.sa:8087/fileUpload';
    this.scienRepFileName = '';
    this.scienRepFileType = '';
    this.scienRepFileUploadSuccess = false;
    this.scienRepFileOk = false;
    this.allOk = false;
  }
  onPlanUpload(event) {
    this.msgs = [];
    if (event.originalEvent.body.errorMessage.errorCode === '0') {

      this.scienRepFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.scienRepFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.scienRepFileUploadSuccess = true;
      this.scienRepFileOk = true;
    } else {
      this.scienRepFileUploadSuccess = false;
      this.scienRepFileOk = false;
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Decision File Upload Failed'});
    }
  }

  onReset() {
    this.consultations.refreshPage();
  }

  uploadApproveScientificReport() {
    if (this.scienRepFileUploadSuccess) {
      // tslint:disable-next-line:max-line-length
      this.consulTeamPresService.c2Task06SubmitScientificReviewReport(this.consultations.selRow, true, this.scienRepFileName, this.scienRepFileType, '4360916').pipe(
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

  uploadRejectScientificReport() {
    if (this.scienRepFileUploadSuccess) {
      // tslint:disable-next-line:max-line-length
      this.consulTeamPresService.c2Task06SubmitScientificReviewReport(this.consultations.selRow, false, this.scienRepFileName, this.scienRepFileType, '4360916').pipe(
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
