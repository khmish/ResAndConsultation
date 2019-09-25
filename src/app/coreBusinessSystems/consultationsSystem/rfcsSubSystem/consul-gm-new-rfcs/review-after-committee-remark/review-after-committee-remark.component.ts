import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {GmReviewAfterCommitteeService} from '../../../../../service/data/gm-review-after-committee.service';
import {ConsulGmNewRfcsComponent} from '../consul-gm-new-rfcs.component';

@Component({
  selector: 'app-review-after-committee-remark',
  templateUrl: './review-after-committee-remark.component.html',
  styleUrls: ['./review-after-committee-remark.component.scss']
})
export class ReviewAfterCommitteeRemarkComponent implements OnInit {

  selectedRfcId: string;
  rfcGmRemarksAfterCommittee: '';

  // tslint:disable-next-line:max-line-length
  constructor(private viewAllCon: ConsulGmNewRfcsComponent, private reviewGMAfterCommitteeService: GmReviewAfterCommitteeService) {
  }

  ngOnInit() {
    this.selectedRfcId = this.viewAllCon.selRow;
  }

  updateNewGmRfcReviewAfterCommittee() {
    console.log(this.selectedRfcId);
    console.log(this.rfcGmRemarksAfterCommittee);
    this.reviewGMAfterCommitteeService.updateGmRfcReviewDeputyAfterCommittee(this.selectedRfcId,
      this.rfcGmRemarksAfterCommittee).subscribe((res: HttpResponse<any>) => {
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
    this.updateNewGmRfcReviewAfterCommittee();
  }

}
