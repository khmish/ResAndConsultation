import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LanguageTranslationModule} from './shared/modules/language-translation/language-translation.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './shared';
import {ConsultationComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/gmNewRfcs/addNewRfcGM/consultation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
// tslint:disable-next-line:max-line-length
import {StudyneedandbusscenterComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/gmNewRfcs/studyneedandbusscenter/studyneedandbusscenter.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {AccordionModule} from 'primeng/components/accordion/accordion';
import {
  CalendarModule,
  CardModule,
  DialogService,
  FieldsetModule, FileUploadModule,
  MenubarModule,
  MenuModule,
  MessageModule,
  PanelModule,
  RadioButtonModule,
  SplitButtonModule,
  ToolbarModule
} from 'primeng/primeng';
import {InputTextModule} from 'primeng/inputtext';
import {LoginModule} from './login/login.module';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {LayoutModule} from './layout/layout.module';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DashboardModule} from './layout/dashboard/dashboard.module';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
import {UserPrivilagesHttpBodyService} from './service/data/httpBodies/user-privilages-http-body.service';
import {SidebarComponent} from './layout/components/sidebar/sidebar.component';
import {UserAccessService} from './service/user-access.service';
// tslint:disable-next-line:max-line-length
import {NewRfcsDeputyReviewComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/deputyNewRfcs/new-rfcs-deputy-review/new-rfcs-deputy-review.component';
// tslint:disable-next-line:max-line-length
import {ConsulGmRfcsReviewComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/consul-gm-new-rfcs/consul-gm-rfcs-review/consul-gm-rfcs-review.component';
// tslint:disable-next-line:max-line-length
import {GetdepartmentemployeesComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/spec-dept-and-comm-rfcs/getdepartmentemployees/getdepartmentemployees.component';
// tslint:disable-next-line:max-line-length
import {SpecemplrfcreviewComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/spec-dept-and-comm-rfcs/specemplrfcreview/specemplrfcreview.component';
import {ToastModule} from 'primeng/toast';
// tslint:disable-next-line:max-line-length
import {RfcCommitteeManualApprovalComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/spec-dept-and-comm-rfcs/rfc-committee-manual-approval/rfc-committee-manual-approval.component';
// tslint:disable-next-line:max-line-length
import {ReviewAfterCommitteeRemarkComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/consul-gm-new-rfcs/review-after-committee-remark/review-after-committee-remark.component';
// tslint:disable-next-line:max-line-length
import {DeputyRejectRemarkComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/consul-gm-new-rfcs/deputy-reject-remark/deputy-reject-remark.component';
// tslint:disable-next-line:max-line-length
import {AcceptRejectReviewComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/deputyNewRfcs/accept-reject-review/accept-reject-review.component';

// tslint:disable-next-line:max-line-length
import {ReviewResultAndFinalDecisionRemarksComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/gmNewRfcs/review-result-and-final-decision-remarks/review-result-and-final-decision-remarks.component';
import { RfcFullDetailsComponent } from './reusableComponents/rfc-full-details/rfc-full-details.component';
import {DataViewModule} from 'primeng/dataview';
import { ConsultationFullDetailsComponent } from './reusableComponents/consultation-full-details/consultation-full-details.component';
// tslint:disable-next-line:max-line-length
import {AssignTeamTypeComponent} from './coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept-new-consultations/assign-team-type/assign-team-type.component';
// tslint:disable-next-line:max-line-length
import { UpdateTeamComponent } from './coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept-new-consultations/update-team/update-team.component';
// tslint:disable-next-line:max-line-length
import { AddNewMemberComponent } from './coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept-new-consultations/add-new-member/add-new-member.component';
// tslint:disable-next-line:max-line-length
import { AddNewTeamComponent } from './coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept-new-consultations/add-new-team/add-new-team.component';
// tslint:disable-next-line:max-line-length
import { UpdateMembersComponent } from './coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept-new-consultations/update-members/update-members.component';
// tslint:disable-next-line:max-line-length
import { ConsulIPAGMReviewComponent } from './coreBusinessSystems/consultationsSystem/consultationAssignments/consul-ipagmnew-consultations/consul-ipagmreview/consul-ipagmreview.component';
// tslint:disable-next-line:max-line-length
import { UploadDocumentsComponent } from './coreBusinessSystems/consultationsSystem/consultationAssignments/consul-ihrnew-consultations/upload-documents/upload-documents.component';
import { BpmnWorkflowViewerComponent } from './reusableComponents/bpmn-workflow-viewer/bpmn-workflow-viewer.component';
// tslint:disable-next-line:max-line-length
import { PopupUploadPlanComponent } from './coreBusinessSystems/consultationsSystem/consultationAssignments/consul-team-president/popup-upload-plan/popup-upload-plan.component';
// tslint:disable-next-line:max-line-length
import { ReviewAndSendToCommitteeComponent } from './coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept-new-consultations/review-and-send-to-committee/review-and-send-to-committee.component';
import { ReviewAndTakeDecisionByCommitteeComponent } from './coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept-new-consultations/review-and-take-decision-by-committee/review-and-take-decision-by-committee.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    DashboardModule,
    AccordionModule,
    MenuModule,
    MenubarModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    LoginModule,
    HttpClientModule,
    TableModule,
    DropdownModule,
    AutoCompleteModule,
    LayoutModule,
    ToolbarModule,
    SplitButtonModule,
    DynamicDialogModule,
    RadioButtonModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LanguageTranslationModule,
    AppRoutingModule,
    AutoCompleteModule,
    DropdownModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    DashboardModule,
    AccordionModule,
    MenuModule,
    MenubarModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    HttpClientModule,
    TableModule,
    DropdownModule,
    AutoCompleteModule,
    ToolbarModule,
    SplitButtonModule,
    DynamicDialogModule,
    RadioButtonModule,
    MessageModule,
    ToastModule,
    PanelModule,
    FieldsetModule,
    CardModule,
    DataViewModule,
    CalendarModule,
    FileUploadModule
  ],
  declarations: [AppComponent, StudyneedandbusscenterComponent,
    ConsultationComponent,
    NewRfcsDeputyReviewComponent,
    ConsulGmRfcsReviewComponent,
    GetdepartmentemployeesComponent,
    SpecemplrfcreviewComponent,
    RfcCommitteeManualApprovalComponent,
    ReviewAfterCommitteeRemarkComponent,
    DeputyRejectRemarkComponent,
    AcceptRejectReviewComponent,
    ReviewResultAndFinalDecisionRemarksComponent,
    AssignTeamTypeComponent,
    UpdateTeamComponent,
    AddNewMemberComponent,
    AddNewTeamComponent,
    UpdateMembersComponent,
    ConsulIPAGMReviewComponent,
    UploadDocumentsComponent,
    BpmnWorkflowViewerComponent,
    PopupUploadPlanComponent,
    ReviewAndSendToCommitteeComponent,
    ReviewAndTakeDecisionByCommitteeComponent
  ],
  // tslint:disable-next-line:max-line-length
  providers: [AuthGuard, DashboardComponent, DialogService, UserPrivilagesHttpBodyService, SidebarComponent, UserAccessService,
    RfcFullDetailsComponent, ConsultationFullDetailsComponent],
  bootstrap: [AppComponent],
  exports: [
  ],
  // tslint:disable-next-line:max-line-length
  entryComponents: [StudyneedandbusscenterComponent, NewRfcsDeputyReviewComponent, ConsulGmRfcsReviewComponent,
    GetdepartmentemployeesComponent, SpecemplrfcreviewComponent, RfcCommitteeManualApprovalComponent,
    ReviewAfterCommitteeRemarkComponent, DeputyRejectRemarkComponent, AcceptRejectReviewComponent,
    ReviewResultAndFinalDecisionRemarksComponent, AssignTeamTypeComponent, UpdateTeamComponent,
    AddNewMemberComponent, AddNewTeamComponent, UpdateMembersComponent, ConsulIPAGMReviewComponent,
    UploadDocumentsComponent, BpmnWorkflowViewerComponent, PopupUploadPlanComponent, ReviewAndSendToCommitteeComponent,
    ReviewAndTakeDecisionByCommitteeComponent]
})
export class AppModule {

}
