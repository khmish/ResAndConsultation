import {Component, OnInit} from '@angular/core';
import {SpecDeptNewConsultationsComponent} from '../spec-dept-new-consultations.component';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../../../models/consultation-get-full-data-http-body';
// tslint:disable-next-line:max-line-length
import {SpecDeptService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  minDateValue: Date;
  maxDateValue: Date;

  formatedStartDate: string;
  formatedEndDate: string;

  constId: string;
  actCode: string;
  userId: string;

  // tslint:disable-next-line:max-line-length
  constructor(private viewAllConsul: SpecDeptNewConsultationsComponent, private speDeptService: SpecDeptService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    console.log(this.viewAllConsul.selectedTeamsData1.plannedStartDate);
    this.constId = this.viewAllConsul.selRow;
    this.actCode = this.viewAllConsul.selectedTeamsData1.actCode;
    this.startDate = new Date(this.viewAllConsul.selectedTeamsData1.plannedStartDate);
    this.endDate = new Date(this.viewAllConsul.selectedTeamsData1.plannedEndDate);
    this.userId = sessionStorage.getItem('authenticatedUser');
    console.log(this.constId);
    console.log(this.actCode);
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.userId);
  }

  updateTeam() {
    if (this.startDate === null || this.endDate === null) {
      this.viewAllConsul.showError('Please enter all values');
      return;
    } else {
      this.formatedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
      this.formatedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
      console.log(this.formatedStartDate);
      console.log(this.formatedEndDate);

      this.speDeptService.updateActivity(this.constId,
        this.actCode,
        this.formatedStartDate,
        this.formatedEndDate,
        this.userId).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          if (!err.message.includes('OK')) {
            this.viewAllConsul.showError('Service is down');
          } else {
            this.viewAllConsul.showError(err.error.errorADescription);
          }
          return throwError(err.message);
        })
      ).subscribe((res: HttpResponse<ErrorMessage>) => {
        console.log('res.body ------------> ' + res);
        console.log(res.body.errorCode);
        if (res.body.errorCode === '0') {
          this.viewAllConsul.dialogService.dialogComponentRef.destroy();
          this.viewAllConsul.reloadActivities();
          this.viewAllConsul.showSuccess('TeamType assigned Successfully');
        } else {
          console.log(res.body.errorEDescription);
          this.viewAllConsul.showError(res.body.errorEDescription);
        }
      });
    }
  }

  onReset() {
    this.viewAllConsul.refreshPage();
  }
}
