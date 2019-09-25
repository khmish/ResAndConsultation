import {
  Injectable
} from '@angular/core';

@Injectable()

export class ConsultationDeputyReviewApproval{
  constructor(
    public constId: String ,
    public consulDeputyTeamsApproval: boolean,
    public remark: String,
    public userId: String
  ){}
}
export class ConsultationDeputyPrepareDecisions1Task06{
  constructor(
    public constId: String ,
    public constAttachmentPath: String,
    public scientificAttachmentPath: String,
    public attachmentType: String
  ){}
}
export class ConsultationDeputyPrepareDecisions1Task07{
  constructor(
    public constId: String ,
    public diagnosticAttachmentPath: String,
    public attachmentType: String
  ){}
}
export class ConsultationFullDetailsResponseHttpBody {
  constructor(
    public constId: string,
    public consultationGetFullDataHttpBody: Array < ConsultationGetFullDataHttpBody > ,
    public activityAssignmentResponseHttpBodies: Array < ActivityAssignmentResponseHttpBody > ,
    public errorMsg: ErrorMessage
  ) {}
}

export class ConsultationGetFullDataHttpBody {
  constructor(
    public constId: string,
    public constTitle: string,
    public constDescription: string,
    public constTeamType: string,
    public plannedStartDate: string,
    public plannedEndDate: string,
    public actualStartDate: string,
    public actualEndDate: string,
    public rfcId: string,
    public rfcTitle: string,
    public rfcDescription: string,
    public fieldCode: string,
    public fieldArabicDescription: string,
    public fieldEnglishDescription: string,
    public orgId: string,
    public orgArabicName: string,
    public orgEnglishName: string,
    public orgContactName: string,
    public orgContactJob: string,
    public orgContactPhone: string,
    public orgContactEmail: string,
    public statusCode: string,
    public statusArabicDescription: string,
    public statusEnglishDescription: string,
    public processDefinitionKey: string,
    public processDefinitionAName: string,
    public processDefinitionEName: string,
    public taskDefinitionKey: string,
    public taskDefinitionAName: string,
    public taskDefinitionEName: string
  ) {

  }
}

export class ActivityAssignmentResponseHttpBody {
  constructor(
    public actCode: string,
    public actArabicName: string,
    public actEnglishName: string,
    public plannedStartDate: string,
    public plannedEndDate: string,
    public actualStartDate: string,
    public actualEndDate: string,
    public plannedHStartDate: string,
    public plannedHEndDate: string,
    public actualHStartDate: string,
    public actualHEndDate: string,
    public actStatusDate: string,
    public actResult: string,
    public actRemarks: string,
    public decisionNumber: string,
    public decisionDate: string,
    public ownerDepartmentCode: string,
    public respDepartmentCode: string,
    public benefDepartmentCode: string,
    public ownerEmployeeCode: string,
    public respEmployeeCode: string,
    public benefEmployeeCode: string,
    public originalSubSystemId: string,
    public originalEntityId: string,
    public activityStatusCode: string,
    public activityStatusAName: string,
    public activityStatusEName: string,
    public activityTypeCode: string,
    public activityTypeAName: string,
    public activityTypeEName: string,
    public errorMsg: ErrorMessage,
    public assignmentWithRolesHttpBodies: Array < AssignmentWithRolesHttpBody >
  ) {}
}

export class AssignmentWithRolesHttpBody {
  constructor(
    public actCode: string,
    public tskId: string,
    public emplCode: string,
    public plannedStartDate: string,
    public plannedEndDate: string,
    public actualStartDate: string,
    public actualEndDate: string,
    public plannedHStartDate: string,
    public plannedHEndDate: string,
    public actualHStartDate: string,
    public actualHEndDate: string,
    public assignmentStatusCode: string,
    public assignmentStatusAName: string,
    public assignmentStatusEName: string,
    public arabicFullName: string,
    public englishFullName: string,
    public depatmentCode: string,
    public departmentAName: string,
    public departmentEName: string,
    public branchCode: string,
    public branchName: string,
    public email: string,
    public mobileNumber: string,
    public actualTitle: string,
    public sexFlag: string,
    public otherPhone: string,
    public tableKey: string
  ) {}
}

export class ErrorMessage {
  constructor(
    public errorCode: string,
    public errorADescription: string,
    public errorEDescription: string
  ) {}
}
