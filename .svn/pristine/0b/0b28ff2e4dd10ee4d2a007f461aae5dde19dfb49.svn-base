import {Component, OnInit} from '@angular/core';
import {SpecDeptNewConsultationsComponent} from '../spec-dept-new-consultations.component';
import {ErrorMessage, TeamRoleHttpBody} from '../../../../../models/team-roles';
import {SpecDeptService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-new-member',
  templateUrl: './add-new-member.component.html',
  styleUrls: ['./add-new-member.component.scss']
})
export class AddNewMemberComponent implements OnInit {
  allTeamRoles: Array<TeamRoleHttpBody>;
  selected: any;
  emplCode: string;
  addMemberOk: boolean;
  startDate: Date;
  minDateValue: Date;
  endDate: Date;
  employeeFullName: string;

  formatedStartDate: string;
  formatedEndDate: string;

  // tslint:disable-next-line:max-line-length
  constructor(private viewAllConsul: SpecDeptNewConsultationsComponent, private specDeptService: SpecDeptService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.addMemberOk = true;
    this.allTeamRoles = [];
    console.log(this.viewAllConsul.selRow);
    console.log(this.viewAllConsul.selTeamRow);
    this.emplCode = null;
    this.employeeFullName = null;

    this.specDeptService.loadTeamRoles(this.viewAllConsul.selRow, this.viewAllConsul.selTeamRow).pipe(
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
      console.log(res.body.teamRoleList);
      this.allTeamRoles = res.body.teamRoleList;
    });
  }

  addMember() {
    const teamRoleCode = this.selected ? this.selected.teamRoleId : null;
    console.log(this.viewAllConsul.selTeamRow);
    console.log(teamRoleCode);
    console.log(this.emplCode);

    if (teamRoleCode === null || this.startDate === null || this.endDate === null) {
      this.viewAllConsul.showError('Please enter all values');
      return;
    }

    this.formatedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
    this.formatedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
    console.log(this.formatedStartDate);
    console.log(this.formatedEndDate);

    this.specDeptService.addNewMember(this.viewAllConsul.selTeamRow,
      teamRoleCode,
      this.emplCode,
      this.formatedStartDate,
      this.formatedEndDate).pipe(
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
      console.log(res.body.errorCode);
      if (res.body.errorCode === '0') {
        this.viewAllConsul.showSuccess('Member Added Successfully');
        this.viewAllConsul.refreshPage();
        this.viewAllConsul.reloadMembers();
      }
    });
  }

  onReset() {
    this.viewAllConsul.refreshPage();
  }

  searchEmployee() {
    console.log(this.emplCode);

    if (this.emplCode === null) {
      this.viewAllConsul.showError('Please enter employee code');
      return;
    }

    this.specDeptService.searchEmployee(this.emplCode).pipe(
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
      console.log('res.body ------------> ' + res);
      console.log(res.body);
      if (res.body.errorMessage.errorCode === '0') {
        this.addMemberOk = false;
        this.employeeFullName = res.body.arabicFirstName + ' ' + res.body.arabicFamilyName;
      } else {
        console.log(res.body.errorMessage.errorEDescription);
        this.viewAllConsul.showError(res.body.errorMessage.errorEDescription);
      }
    });
  }
}
