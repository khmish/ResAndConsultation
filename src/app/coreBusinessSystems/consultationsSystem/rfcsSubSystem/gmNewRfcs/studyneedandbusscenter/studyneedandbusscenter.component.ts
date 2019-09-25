import {Component, OnInit} from '@angular/core';
import {ViewallconsultationComponent} from '../viewallconsultation.component';
import {StudyneedandbusscenterstudyService} from '../../../../../service/data/studyneedandbusscenterstudy.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-studyneedandbusscenter',
  templateUrl: './studyneedandbusscenter.component.html',
  styleUrls: ['./studyneedandbusscenter.component.scss']
})
export class StudyneedandbusscenterComponent implements OnInit {

  selSGValue: string;
  selBCValue: string;
  selectedRfcId: string;
  showBussCenter: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(private viewAllCon: ViewallconsultationComponent, private studyNeedService: StudyneedandbusscenterstudyService) {
  }

  ngOnInit() {
    this.selBCValue = 'No';
    this.showBussCenter = false;
    this.selectedRfcId = this.viewAllCon.selRow;
  }

  toogleBussCenter() {
    if (this.selSGValue === 'Yes') {
      this.showBussCenter = true;
    } else if (this.selSGValue === 'No') {
      this.showBussCenter = false;
    }

  }

  updateNeedStudyAndBussCenter() {
    console.log(this.selectedRfcId);
    console.log(this.selSGValue === 'Yes' ? 'true' : 'false');
    console.log(this.selBCValue === 'Yes' ? 'true' : 'false');
    this.studyNeedService.updateNeedStudyAndBussService(this.selectedRfcId,
      this.selSGValue === 'Yes' ? 'true' : 'false',
      this.selBCValue === 'Yes' ? 'true' : 'false').subscribe((res: HttpResponse<any>) => {
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
}
