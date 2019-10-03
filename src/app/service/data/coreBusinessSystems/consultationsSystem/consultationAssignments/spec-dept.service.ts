import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecDeptService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };

  updateTeamType(cId1: string,
                 constTeamType1: string,
                 plannedStartDate1: string,
                 plannedEndDate1: string) {

    // console.log(cId1);
    // console.log(constTeamType1);
    // console.log(plannedStartDate1);
    // console.log(plannedEndDate1);

    return this.http.post('http://springdev.ipaedu.sa:8082/setConsultationTeamTypeConsTask01', {
      cId: cId1,
      constTeamType: constTeamType1,
      plannedStartDate: plannedStartDate1,
      plannedEndDate: plannedEndDate1
    }, this.httpOptions);
  }

  getAllTeams(constId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/getConsultationActivities', {
      constId: constId1
    }, this.httpOptions);
  }

  getAllMembers(actCode1: string, constId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/getConsultationActivityAssignments', {
      actCode: actCode1,
      constId: constId1
    }, this.httpOptions);
  }

  createTeams(constId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/createConsultationTeams', {
      constId: constId1
    }, this.httpOptions);
  }

  updateActivity(constId1: string, actCode1: string, plannedStartDate1: string, plannedEndDate1: string, userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/updateConsActivityPlanTask01', {
      constId: constId1,
      actCode: actCode1,
      plannedStartDate: plannedStartDate1,
      plannedEndDate: plannedEndDate1,
      userId: userId1
    }, this.httpOptions);
  }

  deleteActivity(constId1: string, actCode1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/deleteActivity', {
      constId: constId1,
      actCode: actCode1
    }, this.httpOptions);
  }

  loadTeamRoles(constId1: string, actCode1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/getActivityRoles', {
      constId: constId1,
      actCode: actCode1
    }, this.httpOptions);
  }

  searchEmployee(emplCode1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8086/getEmployeeInfos', {
      emplCode: emplCode1
    }, this.httpOptions);
  }

  addNewMember(actCode1: string, teamRoleId1: string, emplCode1: string, plannedStartDate1: string, plannedEndDate1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/assignTeamMemberConsTask01', {
      actCode: actCode1,
      teamRoleId: teamRoleId1,
      emplCode: emplCode1,
      tskPlannedStartDate: plannedStartDate1,
      tskPlannedEndDate: plannedEndDate1
    }, this.httpOptions);
  }

  loadActivityTypes(constId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/getActivityTypes', {
      constId: constId1
    }, this.httpOptions);
  }

  addNewActivity(constId1: string, plannedStartDate1: string, plannedEndDate1: string, actTypeCode1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/addActivityConsTask01', {
      cId: constId1,
      plannedStartDate: plannedStartDate1,
      plannedEndDate: plannedEndDate1,
      actTypeCode: actTypeCode1
    }, this.httpOptions);
  }

  deleteMembers(actCode1: string, tskId1: string, emplCode1: string, constId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/unassignedConsTeamMemberTask01', {
      actCode: actCode1,
      tskId: tskId1,
      emplCode: emplCode1,
      constId: constId1
    }, this.httpOptions);
  }


  // tslint:disable-next-line:max-line-length
  updateMember(constId1: string, actCode1: string, tskId1: string, emplCode1: string, plannedStartDate1: string, plannedEndDate1: string, teamRoleId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/updateConsTeamMemberTask01', {
      constId: constId1,
      actCode: actCode1,
      tskId: tskId1,
      emplCode: emplCode1,
      plannedStartDate: plannedStartDate1,
      plannedEndDate: plannedEndDate1,
      teamRoleId: teamRoleId1
    }, this.httpOptions);
  }

  sendForApproval(constId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/sendForApprovalTask01', {
      cId: constId1
    }, this.httpOptions);
  }

  reviewAndSendToCommittee(constId1: string, remark1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task02ReviewAndSendToComittee', {
      constId: constId1,
      remark: remark1
    }, this.httpOptions);
  }

  reviewAndTakeDecisionByCommittee(constId1: string, remark1: string, committeeApproval1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task03ProcessCommitteeDecision', {
      constId: constId1,
      committeeResult: remark1,
      committeeApproval: committeeApproval1
    }, this.httpOptions);
  }

  c2Task08SendForProofreading(constId1: string,
                              remarks1: string,
                              userId1: string,
                              reviewer1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task08SendForProofreading', {
      constId: constId1,
      remarks: remarks1,
      userId: userId1,
      reviewer: reviewer1
    }, this.httpOptions);
  }

  reviewConsultationReport(constId1: string,
                           remarks1: string,
                           userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task05SpecDeptMgrReviewHttpBody', {
      constId: constId1,
      remarks: remarks1,
      userId: userId1
    }, this.httpOptions);
  }

  reviewProofReading(constId1: string,
                     proofReadingRemarksExists1: string,
                     proofReadingSimpleRemarks1: string,
                     remarks1: string,
                     reviewer1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task10ReviewProofReadingReport', {
      constId: constId1,
      proofReadingRemarksExists: proofReadingRemarksExists1,
      proofReadingSimpleRemarks: proofReadingSimpleRemarks1,
      remarks: remarks1,
      reviewer: reviewer1
    }, this.httpOptions);
  }


  submitConsultationForDesign(constId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task13SubmiteForDesign', {
      constId: constId1
    }, this.httpOptions);
  }

  sendToDesigner(constId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c3Task06SecDeptMGRSendToDesigner', {
      constId: constId1
    }, this.httpOptions);
  }

  assignCordinator(constId1: string, coordinatorId1: string, remarks1: '') {
    return this.http.post('http://springdev.ipaedu.sa:8082/c3Task01SendForCoordinator', {
      constId: constId1,
      coordinatorId: coordinatorId1,
      remarks: remarks1
    }, this.httpOptions);
  }

  sendToDesignerAfterDeputyReview(constId1: string,
                                  remarks1: string,
                                  userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c3Task09SpecDeptMgrSendToDesigner', {
      constId: constId1,
      remarks: remarks1,
      userId: userId1
    }, this.httpOptions);
  }

  reviewDesignedReport(constId1: string,
                       approved: boolean,
                       remarks1: string,
                       userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task05SpecDeptMgrReviewHttpBody', {
      constId: constId1,
      specDeptMgrDesignApproved: approved,
      remarks: remarks1,
      userId: userId1
    }, this.httpOptions);
  }

  c3Task12SendForRecompanseCalc(constId1: string,
                                specEmployee1: string,
                                userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c3Task12SendForRecompanseCalc', {
      constId: constId1,
      specEmployee: specEmployee1,
      userId: userId1
    }, this.httpOptions);
  }
}
