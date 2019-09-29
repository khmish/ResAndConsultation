import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  ConsulGmNewConsultationsComponent
} from '../consul-gm-new-consultations.component';

@Component({
  selector: 'app-accept-reject-review',
  templateUrl: './accept-reject-review.component.html',
  styleUrls: ['./accept-reject-review.component.scss']
})
export class AcceptRejectReviewComponent implements OnInit {

  remark_comment = '';
  consultationGMReviewApprovalTask02_API = 'http://springdev.ipaedu.sa:8082/consultationGMReviewApprovalTask02';


  constructor(private viewAllCon: ConsulGmNewConsultationsComponent, private http: HttpClient) {}

  ngOnInit() {

  }

  onAccept() {
    this.consultationGMReviewApproval(true);
  }

  onReject() {
    this.consultationGMReviewApproval(false);
  }

  consultationGMReviewApproval(approved: boolean) {

    const RequestBody = {
      constId: this.viewAllCon.selectedConsData.constId,
      consulGmTeamsApproval: approved,
      remark: this.remark_comment,
      userId: +sessionStorage.getItem('authenticatedUser')
    };


    this.http.post(this.consultationGMReviewApprovalTask02_API, RequestBody)
      .subscribe((res: any ) => {
        console.log(res);
        
        this.viewAllCon.dialogService.dialogComponentRef.destroy();
        this.viewAllCon.ngOnInit();
        this.viewAllCon.showSuccess(res.errorADescription);
      }, (err: HttpErrorResponse) => {
        console.log(err);
        this.viewAllCon.showError(err.error.errorADescription);
      });
  }

  onReset() {
    this.viewAllCon.refreshPage();
  }
}
