import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/api';
import {ConsulDeputyNewConsultationsComponent} from '../consul-deputy-new-consultations.component';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
// tslint:disable-next-line:max-line-length
import {ConsulDeputyService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-deputy.service';

@Component({
  selector: 'app-attach-diag-team-desicion',
  templateUrl: './attach-diag-team-desicion.component.html',
  styleUrls: ['./attach-diag-team-desicion.component.scss']
})
export class AttachDiagTeamDesicionComponent implements OnInit {
  allOk: boolean;
  diagFileOk: boolean;

  serverUrl: string;

  diagFileName: string;
  diagFileType: string;

  msgs: Message[] = [];

  diagFileUploadSuccess: boolean;

  constructor(private viewAllCons: ConsulDeputyNewConsultationsComponent, private consulDepService: ConsulDeputyService) {
  }

  ngOnInit() {
    this.allOk = false;
    this.serverUrl = 'http://springdev.ipaedu.sa:8087/fileUpload';
    this.diagFileName = null;
    this.diagFileType = null;
    this.diagFileUploadSuccess = false;
  }

  onDiagDecisionUpload(event) {
    this.msgs = [];
    console.log(JSON.stringify(event));
    console.log(JSON.stringify(event.originalEvent.body.errorMessage));
    if (event.originalEvent.body.errorMessage.errorCode === '0') {
      // console.log(JSON.stringify(event.originalEvent.body));
      console.log(JSON.stringify(event.originalEvent.body.fileName));
      console.log(JSON.stringify(event.originalEvent.body.fileType));
      this.diagFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.diagFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.diagFileUploadSuccess = true;
      // this.msgs.push({severity: 'success', summary: 'Success Message', detail: 'Decision File Uploaded Successfully'});
      this.diagFileOk = true;
      if (this.diagFileOk) {
        this.allOk = true;
      } else {
        this.allOk = false;
      }
    } else {
      this.diagFileUploadSuccess = false;
      this.diagFileOk = false;
      if (this.diagFileOk) {
        this.allOk = true;
      } else {
        this.allOk = false;
      }
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Decision File Upload Failed'});
    }
  }

  onReset() {
    this.viewAllCons.refreshPage();
  }

  uploadDocs() {
    if (this.allOk) {
      this.consulDepService.attachDiagTeamDecision(this.viewAllCons.selRow,
        this.diagFileName,
        this.diagFileType).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          if (!err.message.includes('OK')) {
            this.viewAllCons.showError('Service is down');
          } else {
            this.viewAllCons.showError(err.error.errorADescription);
          }
          return throwError(err.message);
        })
      ).subscribe((res: HttpResponse<any>) => {
        console.log(res.body);
        if (res.body.errorCode === '0') {
          this.viewAllCons.refreshPage();
          this.viewAllCons.ngOnInit();
          this.viewAllCons.showSuccess('Reviewed Successfully');
        } else {
          console.log(res.body.errorEDescription);
          this.viewAllCons.showError(res.body.errorEDescription);
        }
      });
    } else {
      this.viewAllCons.showError('Error while uploading docs');
    }
  }
}
