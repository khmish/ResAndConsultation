import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {GmReviewDeputyRejectService} from '../../../../../service/data/gm-review-deputy-reject.service';
import {ConsulGmNewRfcsComponent} from '../consul-gm-new-rfcs.component';

@Component({
  selector: 'app-deputy-reject-remark',
  templateUrl: './deputy-reject-remark.component.html',
  styleUrls: ['./deputy-reject-remark.component.scss']
})
export class DeputyRejectRemarkComponent implements OnInit {

  selectedRfcId: string;
  rfcGmRemarksDeputyReject: '';

  // tslint:disable-next-line:max-line-length
  constructor(private viewAllCon: ConsulGmNewRfcsComponent, private reviewGMAfterDeputyRejectService: GmReviewDeputyRejectService) {
  }

  ngOnInit() {
    this.selectedRfcId = this.viewAllCon.selRow;
  }

  updateNewGmRfcReviewDeputyReject() {
    console.log(this.selectedRfcId);
    console.log(this.rfcGmRemarksDeputyReject);
    this.reviewGMAfterDeputyRejectService.updateGmRfcReviewDeputyReject(this.selectedRfcId,
      this.rfcGmRemarksDeputyReject).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.errorCode);
      if (res.body.errorCode === '0') {
        this.viewAllCon.dialogService.dialogComponentRef.destroy();
        this.viewAllCon.ngOnInit();
        this.viewAllCon.showSuccess('Consultation reviewed Successfully');
      } else {
        console.log(res.body.errorEDescription);
        this.viewAllCon.showError(res.body.errorEDescription);
      }
    }, error => {
      this.viewAllCon.showError('Service is down');
    });
  }

  onReset() {
    this.viewAllCon.refreshPage();
  }

  onSubmit() {
    this.updateNewGmRfcReviewDeputyReject();
  }

}
