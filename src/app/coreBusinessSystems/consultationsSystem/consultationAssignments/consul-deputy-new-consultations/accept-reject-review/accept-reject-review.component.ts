import { ConsultationDeputyReviewApproval } from './../../../../../models/consultation-get-full-data-http-body';
import { Component, OnInit } from '@angular/core';
import { ConsulDeputyNewConsultationsComponent } from '../consul-deputy-new-consultations.component';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-accept-reject-review',
  templateUrl: './accept-reject-review.component.html',
  styleUrls: ['./accept-reject-review.component.css']
})
export class AcceptRejectReviewComponent implements OnInit {

  remark='';

  selectedConsApproval: ConsultationDeputyReviewApproval;

  acceptTask3Url = 'http://springdev.ipaedu.sa:8082/consultationDeputyReviewApprovalTask03';
  
  constructor(private viewAllCon:ConsulDeputyNewConsultationsComponent,
    private http: HttpClient ,
    private messageService: MessageService) { }

  ngOnInit() {
  }


  acceptRejectTask3(acceptPara: boolean) {

    this.selectedConsApproval = {
      constId: this.viewAllCon.selRow,
      remark: this.remark,
      consulDeputyTeamsApproval: acceptPara,
      userId: sessionStorage.getItem('authenticatedUser')
    };
    console.log(this.selectedConsApproval);

    try {
      // synchronous operation
      this.http.post<any>(this.acceptTask3Url, this.selectedConsApproval)
      .subscribe(
        (data) => {
          // console.log("data "+data);
          this.viewAllCon.refreshPage();
          this.viewAllCon.ngOnInit();
          this.showSuccess(data.errorADescription);
          this.ngOnInit();
        },
        (err: HttpErrorResponse) =>{
          // console.log("err "+err.error.errorADescription);
          this.showError(err.error.errorADescription);
        }
      );
    } catch (error) {


    }

    

  }

  showSuccess(successMessage: string) {
    this.messageService.add({severity: 'success', summary: 'Success Message', detail: successMessage});
  }

  showError(errorMessage: string) {
    this.messageService.add({severity: 'error', summary: 'Error Message', detail: errorMessage});
  }

  onReset() {
    this.viewAllCon.refreshPage();
  }
}
