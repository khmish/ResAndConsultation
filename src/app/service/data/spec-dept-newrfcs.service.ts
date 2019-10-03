import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecDeptNewrfcsService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:max-line-length
  sendJSONDataAndGetAllSpecDeptRfc(dsId1: string, dsProcessVariableValues1: Map<string, string>, dsProcessFilterFunctionValues1: Map<string, string>, processDefinitionKey1: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response' as 'response'
    };

    const variablesMap = {};
    dsProcessVariableValues1.forEach((val: string, key: string) => {
      variablesMap[key] = val;
    });

    const functionsMap = {};
    dsProcessFilterFunctionValues1.forEach((val: string, key: string) => {
      functionsMap[key] = val;
    });

    console.log(dsId1);
    console.log(variablesMap);
    console.log(functionsMap);

    return this.http.post('http://springdev.ipaedu.sa:8082/executeDsQueryFilter', {
      dsId: dsId1,
      dsProcessVariableValues: variablesMap,
      dsProcessFilterFunctionValues: functionsMap,
      processDefinitionKey: processDefinitionKey1
    }, httpOptions);
  }

  fetchAllEmployees(rfcId1: string, departmentCode1: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response' as 'response'
    };

    return this.http.post('http://springdev.ipaedu.sa:8082/getDepartmentEmployeesTask04', {
      rfcId: rfcId1,
      departmentCode: departmentCode1
    }, httpOptions);
  }

  assignRfcToEmployee(rfcId1: string, employeeCode1: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response' as 'response'
    };

    return this.http.post('http://springdev.ipaedu.sa:8082/assignToSpecializedEmployeeTask04', {
      rfcId: rfcId1,
      employeeCode: employeeCode1,
      userId: sessionStorage.getItem('authenticatedUser')
    }, httpOptions);
  }

}
