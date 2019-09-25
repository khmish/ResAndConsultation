import {Component, OnInit} from '@angular/core';
import {DeputyReviewAfterGmCommitteReviewService} from '../../../../../service/data/deputy-review-after-gm-committe-review.service';
import {HttpResponse} from '@angular/common/http';
import {DeputyNewRfcsComponent} from '../deputy-new-rfcs.component';

@Component({
  selector: 'app-accept-reject-review',
  templateUrl: './accept-reject-review.component.html',
  styleUrls: ['./accept-reject-review.component.scss']
})
export class AcceptRejectReviewComponent implements OnInit {

  rfcRemarks: '';
  selectedRfcId: string;

  // tslint:disable-next-line:max-line-length
  constructor(private viewAllCon: DeputyNewRfcsComponent, private rfcReviewAfterGMReviewService: DeputyReviewAfterGmCommitteReviewService) {
  }

  ngOnInit() {
    this.selectedRfcId = this.viewAllCon.selRow;
    this.rfcRemarks = null;
  }

  onAccept() {
    this.updateNewRfcReviewAfterGMReview(true);
  }

  onReject() {
    if (this.rfcRemarks === null) {
      this.viewAllCon.showError('Please enter the remark');
      return;
    } else {
      this.updateNewRfcReviewAfterGMReview(false);
    }
  }

  updateNewRfcReviewAfterGMReview(approved: boolean) {
    console.log(this.selectedRfcId);
    this.rfcReviewAfterGMReviewService.updateDeputyReviewAfterGMReview(this.selectedRfcId,
      approved,
      this.rfcRemarks).subscribe((res: HttpResponse<any>) => {
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

    this.viewAllCon.ngOnInit();
  }

  onReset() {
    this.viewAllCon.refreshPage();
  }
}
