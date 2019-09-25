import {Component, OnInit} from '@angular/core';
import {NewRfcsDeputyReviewServiceService} from '../../../../../service/data/new-rfcs-deputy-review-service.service';
import {DeputyNewRfcsComponent} from '../deputy-new-rfcs.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-new-rfcs-deputy-review',
  templateUrl: './new-rfcs-deputy-review.component.html',
  styleUrls: ['./new-rfcs-deputy-review.component.scss']
})
export class NewRfcsDeputyReviewComponent implements OnInit {

  selectedRfcId: string;
  rfcDeputyRemarks: '';
  rfcDeputyReviewForm: FormGroup;
  submitted = false;

  // tslint:disable-next-line:max-line-length
  constructor(private viewAllCon: DeputyNewRfcsComponent, private rfcDeputyReview: NewRfcsDeputyReviewServiceService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.selectedRfcId = this.viewAllCon.selRow;

    // this.rfcDeputyReviewForm = this.formBuilder.group({
    //   rfcDeputyRemarksV: ['', Validators.required]
    // });
  }

  updateNewRfcDeputyReview() {
    console.log(this.selectedRfcId);
    this.rfcDeputyReview.updateRfcReviewDeputy(this.selectedRfcId,
      this.rfcDeputyRemarks).subscribe((res: HttpResponse<any>) => {
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

  // get f() {
  //   return this.rfcDeputyReviewForm.controls;
  // }

  onReset() {
    // this.submitted = false;
    // this.rfcDeputyReviewForm.reset();
    this.viewAllCon.refreshPage();
  }

  onSubmit() {
    // this.submitted = true;
    // stop here if form is invalid
    // if (this.rfcDeputyReviewForm.invalid) {
    //   return;
    // }
    this.updateNewRfcDeputyReview();

  }
}
