import {Component, OnInit} from '@angular/core';
import {SpecEmplNewrfcsService} from '../../../../../service/data/spec-empl-newrfcs.service';
import {HttpResponse} from '@angular/common/http';
import {SpecDeptAndCommRfcsComponent} from '../spec-dept-and-comm-rfcs.component';

@Component({
  selector: 'app-specemplrfcreview',
  templateUrl: './specemplrfcreview.component.html',
  styleUrls: ['./specemplrfcreview.component.scss']
})
export class SpecemplrfcreviewComponent implements OnInit {
  selectedRfcId: string;
  specDeptRfcSuggestion: string;

  constructor(public specEmplRfcService: SpecEmplNewrfcsService, private specEmplRfc: SpecDeptAndCommRfcsComponent) {
  }

  ngOnInit() {
    this.selectedRfcId = this.specEmplRfc.selRow;
  }

  updateSpecEmplReview() {
    console.log(this.selectedRfcId);
    this.specEmplRfcService.updateSpecEmplRfcReview(this.selectedRfcId,
      this.specDeptRfcSuggestion).subscribe((res: HttpResponse<any>) => {
      console.log(res.body);
      if (res.body.errorCode === '0') {
        this.specEmplRfc.dialogService.dialogComponentRef.destroy();
        this.specEmplRfc.ngOnInit();
        this.specEmplRfc.showSuccess('Reviewed Successfully');
      } else {
        console.log(res.body.errorEDescription);
        this.specEmplRfc.showError(res.body.errorEDescription);
      }
    }, error => {
      this.specEmplRfc.showError('Service is down');
    });

  }

  onReset() {
    this.specEmplRfc.refreshPage();
  }
}
