import {Component, OnInit} from '@angular/core';
import {ConsulIHRNewConsultationsComponent} from '../consul-ihrnew-consultations.component';
import {Message} from 'primeng/api';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
// tslint:disable-next-line:max-line-length
import {ConsulIhrnewService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-ihrnew.service';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent implements OnInit {

  allOk: boolean;
  sciFileOk: boolean;
  consFileOk: boolean;

  teamType: number;

  serverUrl: string;

  consFileName: string;
  consFileType: string;
  sciFileName: string;
  sciFileType: string;
  diagFileName: string;
  diagFileType: string;

  msgs: Message[] = [];

  constructor(private viewAllCons: ConsulIHRNewConsultationsComponent, private consulIhrService: ConsulIhrnewService) {
  }

  ngOnInit() {
    this.allOk = false;
    this.sciFileOk = false;
    this.consFileOk = false;
    this.teamType = +this.viewAllCons.teamType;
    this.serverUrl = 'http://springdev.ipaedu.sa:8087/fileUpload';
    this.consFileName = null;
    this.consFileType = null;
    this.sciFileName = null;
    this.sciFileType = null;
    this.diagFileName = null;
    this.diagFileType = null;
  }

  uploadDocs() {
    if (this.allOk) {
      this.consulIhrService.hrDecisions(this.viewAllCons.selRow,
        this.teamType === 0 ? this.consFileName : null,
        this.teamType === 0 ? this.sciFileName : null,
        this.teamType === 0 ? null : this.diagFileName,
        this.teamType === 0 ? this.consFileType : null,
        this.teamType === 0 ? this.sciFileType : null,
        this.teamType === 0 ? null : this.diagFileType).pipe(
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

  timesToLoop(n: number): any[] {
    return Array(n);
  }

  onReset() {
    this.viewAllCons.refreshPage();
  }

  // onUpload(event) {
  //   console.log(JSON.stringify(event));
  //   console.log(JSON.stringify(event.originalEvent.body.errorMessage));
  //   console.log(JSON.stringify(event.originalEvent.body));
  //   console.log(JSON.stringify(event.originalEvent.body.fileName));
  //   console.log(JSON.stringify(event.originalEvent.body.fileType));
  // }

  onConsDecisionUpload(event) {
    this.msgs = [];
    console.log(JSON.stringify(event));
    console.log(JSON.stringify(event.originalEvent.body.errorMessage));
    if (event.originalEvent.body.errorMessage.errorCode === '0') {
      // console.log(JSON.stringify(event.originalEvent.body));
      console.log(JSON.stringify(event.originalEvent.body.fileName));
      console.log(JSON.stringify(event.originalEvent.body.fileType));
      this.consFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.consFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.msgs.push({severity: 'success', summary: 'Success Message', detail: 'Decision File Uploaded Successfully'});
      this.consFileOk = true;
      if (this.consFileOk && this.sciFileOk) {
        this.allOk = true;
      } else {
        this.allOk = false;
      }
    } else {
      this.consFileOk = false;
      if (this.consFileOk && this.sciFileOk) {
        this.allOk = true;
      } else {
        this.allOk = false;
      }
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Decision File Upload Failed'});
    }
  }

  onScientificFileUpload(event) {
    this.msgs = [];
    console.log(JSON.stringify(event));
    console.log(JSON.stringify(event.originalEvent.body.errorMessage));
    if (event.originalEvent.body.errorMessage.errorCode === '0') {
      // console.log(JSON.stringify(event.originalEvent.body));
      console.log(JSON.stringify(event.originalEvent.body.fileName));
      console.log(JSON.stringify(event.originalEvent.body.fileType));
      this.sciFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.sciFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.msgs.push({severity: 'success', summary: 'Success Message', detail: 'Scientific File Uploaded Successfully'});
      this.sciFileOk = true;
      if (this.consFileOk && this.sciFileOk) {
        this.allOk = true;
      } else {
        this.allOk = false;
      }
    } else {
      this.sciFileOk = false;
      if (this.consFileOk && this.sciFileOk) {
        this.allOk = true;
      } else {
        this.allOk = false;
      }
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Scientific File Upload Failed'});
    }
  }

  onDiagnosticFileUpload(event) {
    this.msgs = [];
    console.log(JSON.stringify(event));
    console.log(JSON.stringify(event.originalEvent.body.errorMessage));
    if (event.originalEvent.body.errorMessage.errorCode === '0') {
      // console.log(JSON.stringify(event.originalEvent.body));
      console.log(JSON.stringify(event.originalEvent.body.fileName));
      console.log(JSON.stringify(event.originalEvent.body.fileType));
      this.diagFileName = JSON.stringify(event.originalEvent.body.fileName);
      this.diagFileType = JSON.stringify(event.originalEvent.body.fileType);
      this.allOk = true;
      this.msgs.push({severity: 'success', summary: 'Success Message', detail: 'Diagnostic File Uploaded Successfully'});
    } else {
      this.allOk = false;
      this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Diagnostic File Upload Failed'});
    }
  }
}
