import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ConfirmationService, DialogService, MessageService, SelectItem} from 'primeng/api';
import {CommonMethods} from '../../../../commons/common-methods';
import {DatePipe} from '@angular/common';
import {
  ActivityAssignmentResponseHttpBody,
  AssignmentWithRolesHttpBody,
  ConsultationGetFullDataHttpBody,
  ErrorMessage
} from '../../../../models/consultation-get-full-data-http-body';
import {SystemFunctionDsQueryHttpBody} from '../../../../service/data/httpBodies/user-privilages-http-body.service';
import {UserAccessService} from '../../../../service/user-access.service';
import {GenerateJSONService} from '../../../../service/data/generate-json.service';
import {HttpResponse} from '@angular/common/http';
// tslint:disable-next-line:max-line-length
import {ConsultationFullDetailsComponent} from '../../../../reusableComponents/consultation-full-details/consultation-full-details.component';
import {AssignTeamTypeComponent} from './assign-team-type/assign-team-type.component';
import {SpecDeptService} from '../../../../service/data/coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {UpdateTeamComponent} from './update-team/update-team.component';
import {AddNewMemberComponent} from './add-new-member/add-new-member.component';
import {AddNewTeamComponent} from './add-new-team/add-new-team.component';
import {UpdateMembersComponent} from './update-members/update-members.component';
import {BpmnWorkflowViewerComponent} from '../../../../reusableComponents/bpmn-workflow-viewer/bpmn-workflow-viewer.component';
import {ReviewAndSendToCommitteeComponent} from './review-and-send-to-committee/review-and-send-to-committee.component';
// tslint:disable-next-line:max-line-length
import {ReviewAndTakeDecisionByCommitteeComponent} from './review-and-take-decision-by-committee/review-and-take-decision-by-committee.component';
import {ReviewConsultationReportComponent} from './review-consultation-report/review-consultation-report.component';
import {ReviewProofReadingComponent} from './review-proof-reading/review-proof-reading.component';
// tslint:disable-next-line:max-line-length
import {PopupSendProofreadingComponent} from './popup-send-proofreading/popup-send-proofreading.component';
import {AssignReportCordinatorComponent} from './assign-report-cordinator/assign-report-cordinator.component';
import {ReviewDesignedReportComponent} from './review-designed-report/review-designed-report.component';
import {SendToDesignerAfterDeputyReviewComponent} from './send-to-designer-after-deputy-review/send-to-designer-after-deputy-review.component';
import {PopupGmSendRecompCalcComponent} from './popup-gm-send-recomp-calc/popup-gm-send-recomp-calc.component';

@Component({
  selector: 'app-spec-dept-new-consultations',
  templateUrl: './spec-dept-new-consultations.component.html',
  styleUrls: ['./spec-dept-new-consultations.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  providers: [DialogService, MessageService, CommonMethods, DatePipe, ConsultationFullDetailsComponent, ConfirmationService]
})
export class SpecDeptNewConsultationsComponent implements OnInit {

  allConsultationsData: ConsultationGetFullDataHttpBody[];
  cols: any[];
  selectedConsData: ConsultationGetFullDataHttpBody;
  selectedConsData1: ConsultationGetFullDataHttpBody;
  selRow: string;
  selTeamRow: string;
  selMemberRow: string;
  selRowForReview: string;

  systemFunctionDsQueryHttpBodies: Array<SystemFunctionDsQueryHttpBody>;
  finalGeneratedJSON = new Map();

  selectedConsulForFullDetails: string;

  errorMessage: ErrorMessage;
  allTeamsList: ActivityAssignmentResponseHttpBody[];
  allMembersList: AssignmentWithRolesHttpBody[];

  teamsCols: any[];
  membersCols: any[];
  parentPresent: boolean;
  teamsPresent: boolean;
  membersPresent: boolean;
  teamType: string;

  showChild: boolean;

  selectedTeamsData: ActivityAssignmentResponseHttpBody;
  selectedTeamsData1: ActivityAssignmentResponseHttpBody;

  selectedMembersData: AssignmentWithRolesHttpBody;
  selectedMembersData1: AssignmentWithRolesHttpBody;
  disableTeamUpdateDelete: boolean;
  disableMembers: boolean;
  disableMemUD: boolean;

  taskDefinitionFilter: SelectItem[];
  processDefinitionFilter: SelectItem[];
  taskDefinitionFilterSplittedArray: string[];
  processDefinitionFilterSplittedArray: string[];

  workflowId: string;
  taskId: string;

  // tslint:disable-next-line:max-line-length
  constructor(private messageService: MessageService, public dialogService: DialogService,
              public userAccessService: UserAccessService, private commonMethod: CommonMethods,
              private generateDataService: GenerateJSONService, private datePipe: DatePipe,
              private specDeptService: SpecDeptService, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.parentPresent = false;
    this.teamsPresent = false;
    this.membersPresent = false;
    this.showChild = false;
    this.disableTeamUpdateDelete = true;
    this.disableMembers = true;
    this.disableMemUD = true;

    this.systemFunctionDsQueryHttpBodies = this.userAccessService.getSystemFunctionDsQueryHttpBody();
    console.log(this.systemFunctionDsQueryHttpBodies);
    this.finalGeneratedJSON = this.commonMethod.createJSONFromString(this.systemFunctionDsQueryHttpBodies);

    console.log('this.finalGeneratedJSON ------------------>  ' + this.finalGeneratedJSON.size);

    for (let i = 0; i < this.finalGeneratedJSON.size; i++) {
      console.log('this.finalGeneratedJSON : ' + i + '-' + this.finalGeneratedJSON.get(i));
    }

    this.generateDataService.sendJSONAndGetAllData(this.finalGeneratedJSON.get(0),
      this.finalGeneratedJSON.get(1),
      this.finalGeneratedJSON.get(2),
      this.finalGeneratedJSON.get(3)).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.dsQueryResult);
      this.allConsultationsData = res.body.dsQueryResult;
      console.log('res.body -------' + this.allConsultationsData);
      this.taskDefinitionFilterSplittedArray = res.body.aTaskDefinitionList.toString().split(',');
      this.processDefinitionFilterSplittedArray = res.body.aProcessDefinitionList.toString().split(',');

      this.taskDefinitionFilter = [
        {label: 'All', value: null}
      ];

      // this.taskDefinitionFilter.push({label: 'All', value: null});
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.taskDefinitionFilterSplittedArray.length; i++) {
        // tslint:disable-next-line:max-line-length
        this.taskDefinitionFilter.push({
          label: this.taskDefinitionFilterSplittedArray[i],
          value: this.taskDefinitionFilterSplittedArray[i]
        });
      }

      this.processDefinitionFilter = [
        {label: 'All', value: null}
      ];

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.processDefinitionFilterSplittedArray.length; i++) {
        // tslint:disable-next-line:max-line-length
        this.processDefinitionFilter.push({
          label: this.processDefinitionFilterSplittedArray[i],
          value: this.processDefinitionFilterSplittedArray[i]
        });
      }
    });

    this.cols = [
      {field: 'constTitle', header: 'Title'},
      {field: 'constDescription', header: 'Description'},
      {field: 'plannedStartDate', header: 'Start Date'},
      {field: 'plannedEndDate', header: 'End Date'},
      {field: 'taskDefinitionAName', header: 'الحالة'},
      {field: 'processDefinitionAName', header: 'Process Name'}

    ];

    this.selectedConsulForFullDetails = null;
  }

  showConsultations(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selRow);
    this.selectedConsulForFullDetails = this.selRow;

  }

  showBpmnWorkflow(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.workflowId = this.selectedConsData1 ? this.selectedConsData1.processDefinitionKey : 'none';
    this.taskId = this.selectedConsData1 ? this.selectedConsData1.taskDefinitionKey : 'none';
    console.log(this.workflowId);
    console.log(this.taskId);
    const myData = {
      processDefinitionKey: this.workflowId,
      taskDefinitionKey: this.taskId
    };
    const ref = this.dialogService.open(BpmnWorkflowViewerComponent, {
      data: myData,
      header: 'Workflow and Task Details',
      width: '50%',
      contentStyle: {
        height: '600px', overflow: 'hidden'
      },
      closable: true
    });
    ref.onClose.subscribe(res => this.refreshPage());
  }

  assignConsultationTeamType(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selRow);
    const ref = this.dialogService.open(AssignTeamTypeComponent, {
      header: 'Assign Team Type',
      width: '500px',
      contentStyle: {
        height: '15em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  refreshPage() {
    this.dialogService.dialogComponentRef.destroy();
  }

  showSuccess(successMessage: string) {
    this.messageService.add({severity: 'success', summary: 'Success Message', detail: successMessage});
  }

  showError(errorMessage: string) {
    this.messageService.add({severity: 'error', summary: 'Error Message', detail: errorMessage});
  }

  refreshTeams(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.taskId = this.selectedConsData1 ? this.selectedConsData1.taskDefinitionKey : null;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    this.teamType = this.selectedConsData1 ? this.selectedConsData1.constTeamType : null;
    console.log(this.teamType);
    this.parentPresent = true;
    this.disableMemUD = true;
    if (this.teamType === null) {
      this.showChild = false;
      return;
    } else {
      this.showChild = true;
    }

    this.specDeptService.getAllTeams(this.selRow).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        if (!err.message.includes('OK')) {
          this.showError('Service is down');
        } else {
          this.showError(err.error.errorADescription);
        }
        return throwError(err.message);
      })
    ).subscribe((res: HttpResponse<any>) => {
      console.log(res.body);
      if (res.body.errorMessage.errorCode === '0') {
        this.allTeamsList = res.body.activityAssignmentResponseHttpBodies;

        this.teamsCols = [
          {field: 'actArabicName', header: 'Arabic Name'},
          {field: 'plannedStartDate', header: 'Start Date'},
          {field: 'plannedEndDate', header: 'End Date'},
          {field: 'activityStatusAName', header: 'Status'},
        ];

        if (this.allTeamsList.length !== 0) {
          this.teamsPresent = true;
          this.membersPresent = true;
          this.disableTeamUpdateDelete = true;
          this.disableMembers = true;
          console.log(this.allTeamsList[0].actCode);
          this.specDeptService.getAllMembers(this.allTeamsList[0].actCode, this.selRow).pipe(
            catchError(err => {
              console.log('Handling error locally and rethrowing it...', err);
              if (!err.message.includes('OK')) {
                this.showError('Service is down');
              } else {
                this.showError(err.error.errorADescription);
              }
              return throwError(err.message);
            })
          ).subscribe((res1: HttpResponse<any>) => {
            console.log(res1.body);
            if (res1.body.errorMessage.errorCode === '0') {
              this.allMembersList = res1.body.assignmentWithRolesHttpBodies;
              this.membersCols = [
                // {field: 'actCode', header: 'Activity Code'},
                // {field: 'tskId', header: 'Task Id'},
                {field: 'emplCode', header: 'Employee'},
                {field: 'arabicFullName', header: 'Arabic Name'},
                {field: 'branchName', header: 'Branch'},
                {field: 'departmentAName', header: 'Department'},
                {field: 'plannedStartDate', header: 'Start Date'},
                {field: 'plannedEndDate', header: 'End Date'},
                {field: 'assignmentStatusAName', header: 'Status'}
              ];
            } else {
              console.log(res.body.errorEDescription);
              this.showError(res.body.errorEDescription);
            }
          });
        } else {
          this.teamsPresent = false;
          this.membersPresent = false;
          this.disableTeamUpdateDelete = true;
          this.disableMembers = true;
          this.allMembersList = null;
          this.disableMemUD = true;
        }
        // this.showSuccess('Members Loaded');
      } else {
        console.log(res.body.errorEDescription);
        this.showError(res.body.errorEDescription);
      }
    });
  }

  createTeams() {
    console.log(this.selRow);
    this.specDeptService.createTeams(this.selRow).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        if (!err.message.includes('OK')) {
          this.showError('Service is down');
        } else {
          this.showError(err.error.errorADescription);
        }
        return throwError(err.message);
      })
    ).subscribe((res: HttpResponse<any>) => {
      console.log('createTeams -------------> ' + res.body);
      if (res.body.errorCode === '0') {
        this.allMembersList = res.body.assignmentWithRolesHttpBodies;
        this.showSuccess('Teams Loaded');
        console.log('this.selectedConsData.constId ---------> ' + this.selectedConsData.constId);
        this.refreshTeams(this.selectedConsData);
        this.disableTeamUpdateDelete = true;
        this.disableMembers = true;
      } else {
        console.log(res.body.errorEDescription);
        this.showError(res.body.errorEDescription);
      }
    });
  }

  updateTeam(selCon: ActivityAssignmentResponseHttpBody) {
    this.selectedTeamsData1 = selCon;
    this.selTeamRow = this.selectedTeamsData1 ? this.selectedTeamsData1.actCode : 'none';
    console.log(this.selTeamRow);
    const ref = this.dialogService.open(UpdateTeamComponent, {
      header: 'Update Team',
      width: '500px',
      contentStyle: {
        height: '15em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  enableTeamControls() {
    this.selTeamRow = this.selectedTeamsData ? this.selectedTeamsData.actCode : 'none';
    console.log('this.enableTeamControls ---------> ' + this.selTeamRow);
    console.log('this.consulId -------> ' + this.selRow);
    this.disableTeamUpdateDelete = false;
    this.disableMembers = false;
    this.disableMemUD = true;

    console.log(this.selTeamRow);
    this.specDeptService.getAllMembers(this.selTeamRow, this.selRow).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        if (!err.message.includes('OK')) {
          this.showError('Service is down');
        } else {
          this.showError(err.error.errorADescription);
        }
        return throwError(err.message);
      })
    ).subscribe((res: HttpResponse<any>) => {
      console.log(res.body);
      if (res.body.errorMessage.errorCode === '0') {
        this.allMembersList = res.body.assignmentWithRolesHttpBodies;
        this.membersCols = [
          {field: 'emplCode', header: 'Employee'},
          {field: 'arabicFullName', header: 'Arabic Name'},
          {field: 'branchName', header: 'Branch'},
          {field: 'departmentAName', header: 'Department'},
          {field: 'plannedStartDate', header: 'Start Date'},
          {field: 'plannedEndDate', header: 'End Date'},
          {field: 'assignmentStatusAName', header: 'Status'}
        ];
      } else {
        console.log(res.body.errorEDescription);
        this.showError(res.body.errorEDescription);
      }
    });
  }

  reloadActivities() {
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    this.teamType = this.selectedConsData1 ? this.selectedConsData1.constTeamType : null;
    console.log(this.teamType);
    this.parentPresent = true;
    if (this.teamType === null) {
      this.showChild = false;
      return;
    } else {
      this.showChild = true;
    }

    this.specDeptService.getAllTeams(this.selRow).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        if (!err.message.includes('OK')) {
          this.showError('Service is down');
        } else {
          this.showError(err.error.errorADescription);
        }
        return throwError(err.message);
      })
    ).subscribe((res: HttpResponse<any>) => {
      console.log(res.body);
      if (res.body.errorMessage.errorCode === '0') {
        this.allTeamsList = res.body.activityAssignmentResponseHttpBodies;

        this.teamsCols = [
          {field: 'actArabicName', header: 'Arabic Name'},
          {field: 'plannedStartDate', header: 'Start Date'},
          {field: 'plannedEndDate', header: 'End Date'},
          {field: 'activityStatusAName', header: 'Status'},
        ];

        if (this.allTeamsList.length !== 0) {
          this.teamsPresent = true;
          this.membersPresent = true;
          this.disableTeamUpdateDelete = true;
          console.log(this.allTeamsList[0].actCode);
          this.specDeptService.getAllMembers(this.allTeamsList[0].actCode, this.selRow).pipe(
            catchError(err => {
              console.log('Handling error locally and rethrowing it...', err);
              if (!err.message.includes('OK')) {
                this.showError('Service is down');
              } else {
                this.showError(err.error.errorADescription);
              }
              return throwError(err.message);
            })
          ).subscribe((res1: HttpResponse<any>) => {
            console.log(res1.body);
            if (res1.body.errorMessage.errorCode === '0') {
              this.allMembersList = res1.body.assignmentWithRolesHttpBodies;
              this.membersCols = [
                // {field: 'actCode', header: 'Activity Code'},
                // {field: 'tskId', header: 'Task Id'},
                {field: 'emplCode', header: 'Employee'},
                {field: 'arabicFullName', header: 'Arabic Name'},
                {field: 'branchName', header: 'Branch'},
                {field: 'departmentAName', header: 'Department'},
                {field: 'plannedStartDate', header: 'Start Date'},
                {field: 'plannedEndDate', header: 'End Date'},
                {field: 'assignmentStatusAName', header: 'Status'}
              ];
            } else {
              console.log(res.body.errorEDescription);
              this.showError(res.body.errorEDescription);
            }
          });
        } else {
          this.teamsPresent = false;
          this.membersPresent = false;
          this.disableTeamUpdateDelete = true;
        }
        // this.showSuccess('Members Loaded');
      } else {
        console.log(res.body.errorEDescription);
        this.showError(res.body.errorEDescription);
      }
    });
  }

  reloadMembers() {
    console.log(this.selTeamRow);
    this.specDeptService.getAllMembers(this.selTeamRow, this.selRow).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        if (!err.message.includes('OK')) {
          this.showError('Service is down');
        } else {
          this.showError(err.error.errorADescription);
        }
        return throwError(err.message);
      })
    ).subscribe((res: HttpResponse<any>) => {
      console.log(res.body);
      if (res.body.errorMessage.errorCode === '0') {
        this.allMembersList = res.body.assignmentWithRolesHttpBodies;
        this.membersCols = [
          {field: 'emplCode', header: 'Employee'},
          {field: 'arabicFullName', header: 'Arabic Name'},
          {field: 'branchName', header: 'Branch'},
          {field: 'departmentAName', header: 'Department'},
          {field: 'plannedStartDate', header: 'Start Date'},
          {field: 'plannedEndDate', header: 'End Date'},
          {field: 'assignmentStatusAName', header: 'Status'}
        ];
      } else {
        console.log(res.body.errorEDescription);
        this.showError(res.body.errorEDescription);
      }
    });
  }

  deleteActivity(selCon: ActivityAssignmentResponseHttpBody) {
    console.log(this.selectedConsData1.constId);
    console.log(selCon.actCode);
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.specDeptService.deleteActivity(this.selectedConsData1.constId,
          selCon.actCode).pipe(
          catchError(err => {
            console.log('Handling error locally and rethrowing it...', err);
            if (!err.message.includes('OK')) {
              this.showError('Service is down');
            } else {
              this.showError(err.error.errorADescription);
            }
            return throwError(err.message);
          })
        ).subscribe((res: HttpResponse<ErrorMessage>) => {
          console.log('res.body ------------> ' + res);
          console.log(res.body.errorCode);
          if (res.body.errorCode === '0') {
            this.reloadActivities();
            this.showSuccess('Record deleted Successfully');
          } else {
            console.log(res.body.errorEDescription);
            this.showError(res.body.errorEDescription);
          }
        });
      },
      reject: () => {
        this.showError('Deleted Canceled');
      }
    });
  }

  addMembers(selCon: AssignmentWithRolesHttpBody) {
    this.selectedMembersData1 = selCon;
    const ref = this.dialogService.open(AddNewMemberComponent, {
      header: 'Add New Member',
      width: '500px',
      contentStyle: {
        height: '20em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  addNewTeam(selCon: ActivityAssignmentResponseHttpBody) {
    this.selectedTeamsData1 = selCon;
    const ref = this.dialogService.open(AddNewTeamComponent, {
      header: 'Add New Team',
      width: '500px',
      contentStyle: {
        height: '15em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  deleteMembers(selMem: AssignmentWithRolesHttpBody) {
    console.log(selMem.actCode);
    console.log(selMem.tskId);
    console.log(selMem.emplCode);
    console.log(this.selectedConsData1.constId);
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.specDeptService.deleteMembers(selMem.actCode,
          selMem.tskId,
          selMem.emplCode,
          this.selectedConsData1.constId).pipe(
          catchError(err => {
            console.log('Handling error locally and rethrowing it...', err);
            if (!err.message.includes('OK')) {
              this.showError('Service is down');
            } else {
              this.showError(err.error.errorADescription);
            }
            return throwError(err.message);
          })
        ).subscribe((res: HttpResponse<ErrorMessage>) => {
          console.log('res.body ------------> ' + res);
          console.log(res.body.errorCode);
          if (res.body.errorCode === '0') {
            this.reloadActivities();
            this.showSuccess('Record deleted Successfully');
          } else {
            console.log(res.body.errorEDescription);
            this.showError(res.body.errorEDescription);
          }
        });
      },
      reject: () => {
        this.showError('Deleted Canceled');
      }
    });
  }

  enableMemberControls() {
    this.disableMemUD = false;
  }

  updateMembers(selMem: AssignmentWithRolesHttpBody) {
    this.selectedMembersData1 = selMem;
    const ref = this.dialogService.open(UpdateMembersComponent, {
      header: 'Update Members',
      width: '500px',
      contentStyle: {
        height: '20em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  sendForApproval(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRow = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selRow);
    this.specDeptService.sendForApproval(this.selRow).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        if (!err.message.includes('OK')) {
          this.showError('Service is down');
        } else {
          this.showError(err.error.errorADescription);
        }
        return throwError(err.message);
      })
    ).subscribe((res: HttpResponse<any>) => {
      console.log(res.body);
      if (res.body.errorCode === '0') {
        this.showSuccess('Consultation has been send for approval');
        this.ngOnInit();
      } else {
        console.log(res.body.errorEDescription);
        this.showError(res.body.errorEDescription);
      }
    });
  }

  hideChildren() {
    this.showChild = false;
  }

  reviewAndSendToCommitte(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRowForReview = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selectedConsData1.taskDefinitionKey);
    const ref = this.dialogService.open(ReviewAndSendToCommitteeComponent, {
      header: 'Review And Send To Committe',
      width: '500px',
      contentStyle: {
        height: '15em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  reviewAndTakeDecisionByCommitte(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRowForReview = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selectedConsData1.taskDefinitionKey);
    const ref = this.dialogService.open(ReviewAndTakeDecisionByCommitteeComponent, {
      header: 'Review And Take Decision By Committe',
      width: '500px',
      contentStyle: {
        height: '20em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  showSendProofReading(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRowForReview = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    const ref = this.dialogService.open(PopupSendProofreadingComponent, {
      header: 'Send Proof Reading',
      width: '450px',
      contentStyle: {
        'max-height': '80%', overflow: 'auto'
      },
      closable: true
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  reviewConsultationReport(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRowForReview = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selectedConsData1.taskDefinitionKey);
    const ref = this.dialogService.open(ReviewConsultationReportComponent, {
      header: 'Review Consultation Report',
      width: '500px',
      contentStyle: {
        height: '15em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  reviewProofReading(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRowForReview = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selectedConsData1.taskDefinitionKey);
    const ref = this.dialogService.open(ReviewProofReadingComponent, {
      header: 'Review Prof Reading',
      width: '500px',
      contentStyle: {
        height: '30em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  submitConsultationForDesign(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRowForReview = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selectedConsData1.taskDefinitionKey);
    this.specDeptService.submitConsultationForDesign(this.selRowForReview).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.errorCode);
      if (res.body.errorCode === '0') {
        this.ngOnInit();
        this.showSuccess('Consultation send to Design successfully');
      } else {
        console.log(res.body.errorEDescription);
        this.showError(res.body.errorEDescription);
      }
    }, error => {
      this.showError('Service is down');
    });

    this.ngOnInit();
  }

  paginate(event) {
    console.log('event -----------> ' + event);
    this.showChild = false;
  }

  assignCordinator(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRowForReview = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selectedConsData1.taskDefinitionKey);
    const ref = this.dialogService.open(AssignReportCordinatorComponent, {
      header: 'Assign Cordinator',
      width: '500px',
      contentStyle: {
        height: '20em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  reviewDesignedReport(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRowForReview = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selectedConsData1.taskDefinitionKey);
    const ref = this.dialogService.open(ReviewDesignedReportComponent, {
      header: 'Review Designed Report',
      width: '500px',
      contentStyle: {
        height: '25em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }

  sendToDesigner(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRowForReview = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selectedConsData1.taskDefinitionKey);
    this.specDeptService.sendToDesigner(this.selRowForReview).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.errorCode);
      if (res.body.errorCode === '0') {
        this.ngOnInit();
        this.showSuccess('Consultation send to designer successfully');
      } else {
        console.log(res.body.errorEDescription);
        this.showError(res.body.errorEDescription);
      }
    }, error => {
      this.showError('Service is down');
    });

    this.ngOnInit();
  }

  sendToDesignerAfterDeputyReview(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRowForReview = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selectedConsData1.taskDefinitionKey);
    const ref = this.dialogService.open(SendToDesignerAfterDeputyReviewComponent, {
      header: 'Send To Designer',
      width: '500px',
      contentStyle: {
        height: '20em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }
  sendForRecomponseCalc(selCon: ConsultationGetFullDataHttpBody) {
    this.selectedConsData1 = selCon;
    this.selRowForReview = this.selectedConsData1 ? this.selectedConsData1.constId : 'none';
    console.log(this.selectedConsData1.taskDefinitionKey);
    const ref = this.dialogService.open(PopupGmSendRecompCalcComponent, {
      header: 'Send To Designer',
      width: '500px',
      contentStyle: {
        height: '20em', overflow: 'visible'
      },
      closable: false
    });

    ref.onClose.subscribe(res => this.refreshPage());
  }
}
