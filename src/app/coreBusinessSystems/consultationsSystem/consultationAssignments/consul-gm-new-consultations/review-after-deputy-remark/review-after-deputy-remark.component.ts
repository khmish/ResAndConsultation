import { Component, OnInit } from '@angular/core';
import {ConsulGmNewConsultationsComponent} from '../consul-gm-new-consultations.component';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-review-after-deputy-remark',
  templateUrl: './review-after-deputy-remark.component.html',
  styleUrls: ['./review-after-deputy-remark.component.scss']
})
export class ReviewAfterDeputyRemarkComponent implements OnInit {

 
  GMRemarksAfterDeputy: '';
  consultationGMReviewRejected_API = 'http://springdev.ipaedu.sa:8082/c1Task05consultationGMReviewRejected';

  // tslint:disable-next-line:max-line-length
  constructor(private viewAllCon: ConsulGmNewConsultationsComponent, private http: HttpClient) {
  }

  ngOnInit() {}

  updateNewGmRfcReviewAfterDeputy() {
    const RequestBody = {
      constId: this.viewAllCon.selectedConsData.constId,
      remark: this.GMRemarksAfterDeputy
    };


    this.http.post(this.consultationGMReviewRejected_API, RequestBody)
      .subscribe((res: any) => {
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

  onSubmit() {
    this.updateNewGmRfcReviewAfterDeputy();
  }

}
