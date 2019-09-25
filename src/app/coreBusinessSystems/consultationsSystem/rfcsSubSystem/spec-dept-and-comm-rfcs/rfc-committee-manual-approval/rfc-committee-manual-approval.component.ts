import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {RfcCommitteeDecisionsService} from '../../../../../service/data/rfc-committee-decisions.service';
import {SpecDeptAndCommRfcsComponent} from '../spec-dept-and-comm-rfcs.component';

@Component({
  selector: 'app-rfc-committee-manual-approval',
  templateUrl: './rfc-committee-manual-approval.component.html',
  styleUrls: ['./rfc-committee-manual-approval.component.scss']
})
export class RfcCommitteeManualApprovalComponent implements OnInit {

  selectedRfcId: string;
  rfcManualApprovalRemarks: string;

  // tslint:disable-next-line:max-line-length
  constructor(private messageService: MessageService, public allCommitteeDecisionService: RfcCommitteeDecisionsService, public committeeComponent: SpecDeptAndCommRfcsComponent) {
  }


  ngOnInit() {
    this.selectedRfcId = this.committeeComponent.selRow;
    this.rfcManualApprovalRemarks = null;
  }

  onSubmit() {
    console.log(this.rfcManualApprovalRemarks);
    if (this.rfcManualApprovalRemarks === null) {
      this.committeeComponent.showError('Please enter meeting details');
      return;
    }

    console.log(this.selectedRfcId);
    this.allCommitteeDecisionService.manualProcessApproval(this.selectedRfcId,
      this.rfcManualApprovalRemarks).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.errorCode);
      if (res.body.errorCode === '0') {
        this.committeeComponent.dialogService.dialogComponentRef.destroy();
        this.committeeComponent.ngOnInit();
        this.committeeComponent.showSuccess('Consultation approved manually');
      } else {
        console.log(res.body.errorEDescription);
        this.committeeComponent.showError(res.body.errorEDescription);
      }
    }, error => {
      this.committeeComponent.showError('Service is down');
    });
  }

  onReset() {
    this.committeeComponent.refreshPage();
  }
}
