import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';
import {ConsulTeamPresidentComponent} from '../consul-team-president.component';
import {ConsulTeamPresedentService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-team-presedent.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-popup-upload-consul-report',
  templateUrl: './popup-upload-consul-report.component.html',
  styleUrls: ['./popup-upload-consul-report.component.scss']
})
export class PopupUploadConsulReportComponent implements OnInit {
  serverUrl: string;
  msgs: Message[] = [];
  consFileName: string;
  consFileType: string;
  consFileUploadSuccess: boolean;
  consFileOk: boolean;
  constructor(private consultations: ConsulTeamPresidentComponent, private consulTeamPresService: ConsulTeamPresedentService) { }

  ngOnInit() {
    this.serverUrl = 'http://springdev.ipaedu.sa:8087/fileUpload';
    this.consFileName = '';
    this.consFileType = '';
    this.consFileUploadSuccess = false;
    this.consFileOk = false;
  }

  onPlanUpload(event) {
    this.msgs = [];
    if (event.originalEvent.body.errorMessage.errorCode === '0') {

      this.consFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.consFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.consFileUploadSuccess = true;
      this.consFileOk = true;
    } else {
      this.consFileUploadSuccess = false;
      this.consFileOk = false;
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Decision File Upload Failed'});
    }
  }

  onReset() {
    this.consultations.refreshPage();
  }

  uploadPlan() {
    if (this.consFileUploadSuccess) {
      // tslint:disable-next-line:max-line-length
      this.consulTeamPresService.c2Task04SendConsultationReportForApproval(this.consultations.selRow, this.consFileName, '4360916', this.consFileType).pipe(
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
