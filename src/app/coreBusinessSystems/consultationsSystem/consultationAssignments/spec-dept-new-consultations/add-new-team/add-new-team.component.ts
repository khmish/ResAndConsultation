import {Component, OnInit} from '@angular/core';
import {SpecDeptNewConsultationsComponent} from '../spec-dept-new-consultations.component';
// tslint:disable-next-line:max-line-length
import {SpecDeptService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept.service';
import {DatePipe} from '@angular/common';
import {ActivityTypeHttpBody} from '../../../../../models/activity-types';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../../../models/consultation-get-full-data-http-body';

@Component({
  selector: 'app-add-new-team',
  templateUrl: './add-new-team.component.html',
  styleUrls: ['./add-new-team.component.scss']
})
export class AddNewTeamComponent implements OnInit {

  startDate: Date;
  endDate: Date;
  minDateValue: Date;
  maxDateValue: Date;

  formatedStartDate: string;
  formatedEndDate: string;

  constId: string;
  allActivityTypes: ActivityTypeHttpBody[];
  selected: any;

  // tslint:disable-next-line:max-line-length
  constructor(private viewAllConsul: SpecDeptNewConsultationsComponent, private speDeptService: SpecDeptService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.allActivityTypes = [];
    this.constId = this.viewAllConsul.selRow;

    this.speDeptService.loadActivityTypes(this.constId).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        if (!err.message.includes('OK')) {
          this.viewAllConsul.showError('Service is down');
        } else {
          this.viewAllConsul.showError(err.error.errorADescription);
        }
        return throwError(err.message);
      })
    ).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.activityTypeHttpBodyList);
      this.allActivityTypes = res.body.activityTypeHttpBodyList;
    });
  }

  addTeam() {
    const actTypeCode = this.selected ? this.selected.actTypeCode : null;
    if (this.startDate === null || this.endDate === null || actTypeCode == null) {
      this.viewAllConsul.showError('Please enter all values');
      return;
    } else {
      this.formatedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
      this.formatedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
      console.log(this.constId);
      console.log(this.formatedStartDate);
      console.log(this.formatedEndDate);
      console.log(actTypeCode);

      this.speDeptService.addNewActivity(this.constId,
        this.formatedStartDate,
        this.formatedEndDate,
        actTypeCode).pipe(
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
          this.viewAllConsul.showSuccess('Activity added Successfully');
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
