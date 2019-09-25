import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ConsulGmNewRfcsComponent} from '../consul-gm-new-rfcs.component';
import {NewConsulGmRfcServiceService} from '../../../../../service/data/new-consul-gm-rfc-service.service';
import {HttpResponse} from '@angular/common/http';

export class DepartmentFieldLovs {
  constructor(
    public departmentCode: string,
    public departmentArabicName: string,
    public departmentEnglishName: string) {
  }
}

@Component({
  selector: 'app-consul-gm-rfcs-review',
  templateUrl: './consul-gm-rfcs-review.component.html',
  styleUrls: ['./consul-gm-rfcs-review.component.scss']
})
export class ConsulGmRfcsReviewComponent implements OnInit {
  newConsulGMReviewForm: FormGroup;
  errorOccurred: any;
  errorMessage: any;
  selectedRfcId: string;
  allDepartments: DepartmentFieldLovs[];
  selected: any;
  rfcConsulGmRemarks: '';

  // tslint:disable-next-line:max-line-length
  constructor(private viewAllCon: ConsulGmNewRfcsComponent, private rfcConsulGmRfcReview: NewConsulGmRfcServiceService) {
  }

  ngOnInit() {
    this.selectedRfcId = this.viewAllCon.selRow;

    this.rfcConsulGmRfcReview.getAllDepartmentsList().subscribe(res => {
      this.allDepartments = res;
      console.log(this.allDepartments);
    });


  }

  updateNewConsulGmRfcReview() {
    console.log(this.selectedRfcId);
    this.rfcConsulGmRfcReview.updateConsulGmRfcReviewDeputy(this.selectedRfcId,
      this.selected !== null ? this.selected.departmentCode : null,
      this.rfcConsulGmRemarks).subscribe((res: HttpResponse<any>) => {
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
    const deptCode = this.selected ? this.selected.departmentCode : 'none';
    console.log(deptCode);
    if (deptCode === 'none') {
      this.viewAllCon.showError('Please select department');
      return;
    }
    this.updateNewConsulGmRfcReview();

  }
}
