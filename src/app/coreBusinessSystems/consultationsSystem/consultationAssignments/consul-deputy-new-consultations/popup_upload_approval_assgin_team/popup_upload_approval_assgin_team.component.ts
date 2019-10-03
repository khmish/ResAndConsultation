import {ConsulIhrnewService} from './../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/consul-ihrnew.service';
import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Message} from 'primeng/api';
import {HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ConsulDeputyNewConsultationsComponent} from '../consul-deputy-new-consultations.component';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ConsultationDeputyPrepareDecisions1Task06} from './../../../../../models/consultation-get-full-data-http-body';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-popup_upload_approval_assgin_team',
  templateUrl: './popup_upload_approval_assgin_team.component.html',
  styleUrls: ['./popup_upload_approval_assgin_team.component.css']
})
export class Popup_upload_approval_assgin_teamComponent implements OnInit {

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

  task6Url = 'http://springdev.ipaedu.sa:8082/consultationDeputyPrepareDecisions1Task06';
  modelTask6: ConsultationDeputyPrepareDecisions1Task06;

  msgs: Message[] = [];

  constructor(private messageService: MessageService,
              private http: HttpClient,
              private viewAllCons: ConsulDeputyNewConsultationsComponent
  ) {
  }


  ngOnInit() {
    this.allOk = false;
    this.sciFileOk = false;
    this.consFileOk = false;
    // this.teamType = +this.viewAllCons.teamType;
    this.serverUrl = 'http://springdev.ipaedu.sa:8087/fileUpload';
    this.consFileName = null;
    this.consFileType = null;
    this.sciFileName = null;
    this.sciFileType = null;
    this.diagFileName = null;
    this.diagFileType = null;
  }

  uploadDocs() {


    this.modelTask6 = {
      constId: this.viewAllCons.selRow,
      constAttachmentPath: this.consFileName,
      scientificAttachmentPath: this.sciFileName,
      scienAttachType: this.sciFileType,
      constAttachType: this.consFileType

    };
    this.http.post<any>(this.task6Url, this.modelTask6)
      .subscribe((res) => {
          console.log(res.body);
          if (res.body.errorCode === '0') {
            this.viewAllCons.refreshPage();
            this.viewAllCons.ngOnInit();
            this.showSuccess('Reviewed Successfully');
          } else {

          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.error.errorADescription);
          this.showError(err.error.errorADescription);

        });


  }

  timesToLoop(n: number): any[] {
    return Array(n);
  }

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

  onReset() {
    this.viewAllCons.refreshPage();
  }

  showSuccess(successMessage: string) {
    this.messageService.add({severity: 'success', summary: 'Success Message', detail: successMessage});
  }

  showError(errorMessage: string) {
    this.messageService.add({severity: 'error', summary: 'Error Message', detail: errorMessage});
  }

}
