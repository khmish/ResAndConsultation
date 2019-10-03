import { Component, OnInit } from '@angular/core';
import {ConsulTeamPresidentComponent} from '../consul-team-president.component';
// tslint:disable-next-line:max-line-length
import {ConsulTeamPresedentService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-team-presedent.service';
import {Message} from 'primeng/api';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-popup-sci-review-correction',
  templateUrl: './popup-sci-review-correction.component.html',
  styleUrls: ['./popup-sci-review-correction.component.scss']
})
export class PopupSciReviewCorrectionComponent implements OnInit {
  serverUrl: string;
  msgs: Message[] = [];
  sciCorrFileName: string;
  sciCorrFileType: string;
  sciCorrFileUploadSuccess: boolean;
  sciCorrFileOk: boolean;
  constructor(private consultations: ConsulTeamPresidentComponent, private consulTeamPresService: ConsulTeamPresedentService) { }

  ngOnInit() {
    this.serverUrl = 'http://springdev.ipaedu.sa:8087/fileUpload';
    this.sciCorrFileName = '';
    this.sciCorrFileType = '';
    this.sciCorrFileUploadSuccess = false;
    this.sciCorrFileOk = false;
  }
  onPlanUpload(event) {
    this.msgs = [];
    if (event.originalEvent.body.errorMessage.errorCode === '0') {

      this.sciCorrFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.sciCorrFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.sciCorrFileUploadSuccess = true;
      this.sciCorrFileOk = true;
    } else {
      this.sciCorrFileUploadSuccess = false;
      this.sciCorrFileOk = false;
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Decision File Upload Failed'});
    }
  }

  onReset() {
    this.consultations.refreshPage();
  }

  uploadPlan() {
    if (this.sciCorrFileUploadSuccess) {
      // tslint:disable-next-line:max-line-length
      this.consulTeamPresService.c2Task07SubmitCorrectedReport(this.consultations.selRow, this.sciCorrFileName, '4360916', this.sciCorrFileType).pipe(
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
