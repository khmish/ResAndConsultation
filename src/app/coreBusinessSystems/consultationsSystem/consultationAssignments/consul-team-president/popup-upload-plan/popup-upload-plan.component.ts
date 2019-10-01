import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/api';
import {ConsulTeamPresidentComponent} from '../consul-team-president.component';
// tslint:disable-next-line:max-line-length
import {ConsulTeamPresedentService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-team-presedent.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-popup-upload-plan',
  templateUrl: './popup-upload-plan.component.html',
  styleUrls: ['./popup-upload-plan.component.scss']
})
export class PopupUploadPlanComponent implements OnInit {
  serverUrl: string;
  msgs: Message[] = [];
  planFileName: string;
  planFileType: string;
  planFileUploadSuccess: boolean;
  planFileOk: boolean;

  constructor(private consultations: ConsulTeamPresidentComponent, private consulTeamPresService: ConsulTeamPresedentService) {
  }

  ngOnInit() {
    this.serverUrl = 'http://springdev.ipaedu.sa:8087/fileUpload';
    this.planFileName = '';
    this.planFileType = '';
    this.planFileUploadSuccess = false;
    this.planFileOk = false;
  }

  onPlanUpload(event) {
    this.msgs = [];
    if (event.originalEvent.body.errorMessage.errorCode === '0') {

      this.planFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.planFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.planFileUploadSuccess = true;
      this.planFileOk = true;
    } else {
      this.planFileUploadSuccess = false;
      this.planFileOk = false;
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Decision File Upload Failed'});
    }
  }

  onReset() {
    this.consultations.refreshPage();
  }

  uploadPlan() {
    if (this.planFileUploadSuccess) {
      // tslint:disable-next-line:max-line-length
      this.consulTeamPresService.c2Task01SubmitConsultationPlan(this.consultations.selRow, this.planFileName, '4360916', this.planFileType).pipe(
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
