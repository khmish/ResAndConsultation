import {Component, OnInit} from '@angular/core';
import {ErrorMessage, TeamRoleHttpBody} from '../../../../../models/team-roles';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {SpecDeptNewConsultationsComponent} from '../spec-dept-new-consultations.component';
// tslint:disable-next-line:max-line-length
import {SpecDeptService} from '../../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-update-members',
  templateUrl: './update-members.component.html',
  styleUrls: ['./update-members.component.scss']
})
export class UpdateMembersComponent implements OnInit {
  updateMemberOk: boolean;
  allTeamRoles: Array<TeamRoleHttpBody>;
  selected: any;
  emplCode: string;
  startDate: Date;
  minDateValue: Date;
  endDate: Date;
  employeeFullName: string;

  formatedStartDate: string;
  formatedEndDate: string;

  constId: string;
  actCode: string;
  taskId: string;
  teamRoleId: string;

  // tslint:disable-next-line:max-line-length
  constructor(private viewAllConsul: SpecDeptNewConsultationsComponent, private specDeptService: SpecDeptService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.allTeamRoles = [];
    console.log(this.viewAllConsul.selRow);
    console.log(this.viewAllConsul.selTeamRow);
    this.emplCode = null;
    this.employeeFullName = null;

    this.constId = this.viewAllConsul.selRow;
    this.actCode = this.viewAllConsul.selectedMembersData1.actCode;
    this.taskId = this.viewAllConsul.selectedMembersData1.tskId;
    this.startDate = new Date(this.viewAllConsul.selectedMembersData1.plannedStartDate);
    this.endDate = new Date(this.viewAllConsul.selectedMembersData1.plannedEndDate);
    this.teamRoleId = this.viewAllConsul.selectedMembersData1.teamRoleId;

    this.emplCode = sessionStorage.getItem('authenticatedUser');
    console.log(this.constId);
    console.log(this.actCode);
    console.log(this.taskId);
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.emplCode);
    console.log(this.teamRoleId);

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

  updateMember() {
    const teamRoleCode = this.selected ? this.selected.teamRoleId : this.teamRoleId;
    if (teamRoleCode === null || this.startDate === null || this.endDate === null) {
      this.viewAllConsul.showError('Please enter all values');
      return;
    }

    this.formatedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
    this.formatedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd\'T\'HH:mm:ss');

    console.log('------------------------------------------------------');
    console.log(this.constId);
    console.log(this.viewAllConsul.selectedMembersData1.actCode);
    console.log(this.viewAllConsul.selectedMembersData1.tskId);
    console.log(this.viewAllConsul.selectedMembersData1.emplCode);
    console.log(this.formatedStartDate);
    console.log(this.formatedEndDate);
    console.log(teamRoleCode);
    console.log('------------------------------------------------------');

    this.specDeptService.updateMember(this.constId,
      this.viewAllConsul.selectedMembersData1.actCode,
      this.viewAllConsul.selectedMembersData1.tskId,
      this.viewAllConsul.selectedMembersData1.emplCode,
      this.formatedStartDate,
      this.formatedEndDate,
      teamRoleCode).pipe(
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
      console.log(res.body);
      if (res.body.errorCode === '0') {
        this.viewAllConsul.showSuccess('Member Updated Successfully');
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
        this.employeeFullName = res.body.arabicFirstName + ' ' + res.body.arabicFamilyName;
      } else {
        console.log(res.body.errorMessage.errorEDescription);
        this.viewAllConsul.showError(res.body.errorMessage.errorEDescription);
      }
    });
  }
}
