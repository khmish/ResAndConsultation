import {Injectable} from '@angular/core';
import {FunctiontreeserviceService} from '../functiontreeservice.service';
import {HttpResponse} from '@angular/common/http';


export class SystemFunctionDsQueryHttpBody {
  constructor(public dsId: string,
              public dsArabicName: string,
              public dsEnglishName: string,
              public dsAngularComponent: string,
              public dsProcessVariables: string,
              public dsProcessFilterFunctions: string,
              public dsReturnHttpBody: string,
              public systemFunctionId: string,
              public processDefinitionKey: string) {
  }
}

export class SystemFunctionHttpBody {
  constructor(public  systemFunctionId: string,
              public  systemFunctionAName: string,
              public  systemFunctionEName: string,
              public  angularRouteLink: string,
              public  systemRoleCode: string,
              public  systemFunctionDsQueryHttpBodies: Array<SystemFunctionDsQueryHttpBody>) {

  }
}

export class SystemRoleHttpBody {
  constructor(public    systemRoleCode: string,
              public    systemRoleAName: string,
              public    systemRoleEName: string,
              public    subSystemId: string,
              public    systemFunctions: Array<SystemFunctionHttpBody>) {

  }
}

export class SubSystemHttpBody {
  constructor(public  subSystemId: string,
              public  subSystemAName: string,
              public  subSystemEName: string,
              public  systemCode: string,
              public  systemRoles: Array<SystemRoleHttpBody>) {
  }
}

export class SystemHttpBody {
  constructor(public  systemCode: string,
              public systemAName: string,
              public systemEName: string,
              public sysCategoryId: string,
              public subSystemHttpBody: Array<SubSystemHttpBody>
  ) {

  }
}

export class SystemCategoryHttpBody {
  constructor(public  sysCategoryId: string,
              public  sysCategoryAName: string,
              public  sysCategoryEName: string,
              public  systems: Array<SystemHttpBody>
  ) {
  }
}


export class EmployeeInfosResponseHttpBody {
  constructor(
    public emplCode: string,
    public arabicFirstName: string,
    public arabicFatherName: string,
    public arabicGFatherName: string,
    public arabicFamilyName: string,
    public englishFirstName: string,
    public englishFatherName: string,
    public englishGFatherName: string,
    public englishFamilyName: string,
    public depatmentCode: string,
    public departmentAName: string,
    public departmentEName: string,
    public branchCode: string,
    public branchName: string,
    public birthDate: string,
    public statusCode: string,
    public statusName: string,
    public ipaEndDate: string,
    public email: string,
    public mobileNumber: string,
    public actualTitle: string,
    public sexFlag: string,
    public otherPhone: string,
    public errorMessage: ErrorMessage
  ) {
  }
}

export class ErrorMessage {
  constructor(public errorCode: string, public errorADescription: string, public errorEDescription: string) {
  }
}

export class UserPrivilagesHttpBody {
  constructor(public systemCategoryHttpBodies: Array<SystemCategoryHttpBody>, public employeeInfosResponseHttpBody: EmployeeInfosResponseHttpBody, public errorMessage: ErrorMessage) {
  }
}


@Injectable({
  providedIn: 'root'
})
export class UserPrivilagesHttpBodyService {
  public userPrivilagesHttpBody: UserPrivilagesHttpBody;

  constructor(public treeService: FunctiontreeserviceService) {
    this.treeService.getAllUserRoles().subscribe((response: HttpResponse<any>) => {
      console.log('FROM SERVICE');
      console.log(response.body);
      this.userPrivilagesHttpBody = response.body;
    });
  }
}
