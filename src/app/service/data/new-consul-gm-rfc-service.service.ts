import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RfcFieldLovs} from '../../coreBusinessSystems/consultationsSystem/rfcsSubSystem/gmNewRfcs/addNewRfcGM/consultation.component';
// tslint:disable-next-line:max-line-length
import {DepartmentFieldLovs} from '../../coreBusinessSystems/consultationsSystem/rfcsSubSystem/consul-gm-new-rfcs/consul-gm-rfcs-review/consul-gm-rfcs-review.component';

@Injectable({
  providedIn: 'root'
})
export class NewConsulGmRfcServiceService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:max-line-length
  sendJSONDataAndGetAllConsGMRfc(dsId1: string, dsProcessVariableValues1: Map<string, string>, dsProcessFilterFunctionValues1: Map<string, string>, processDefinitionKey1: string) {
    console.log(dsId1);
    console.log(dsProcessVariableValues1);
    console.log(dsProcessFilterFunctionValues1);
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

    return this.http.post('http://springdev.ipaedu.sa:8082/executeDsQueryFilter', {
      dsId: dsId1,
      dsProcessVariableValues: variablesMap,
      dsProcessFilterFunctionValues: functionsMap,
      processDefinitionKey: processDefinitionKey1
    }, httpOptions);
  }


  updateConsulGmRfcReviewDeputy(rfcId1: string, deptCode: string, remarks: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response' as 'response'
    };

    return this.http.post('http://springdev.ipaedu.sa:8082/updateTask03', {
      rfcId: rfcId1,
      departmentCode: deptCode,
      remark: remarks,
      userId: sessionStorage.getItem('authenticatedUser')
    }, httpOptions);
  }

  getAllDepartmentsList() {
    return this.http.get<DepartmentFieldLovs[]>('http://springdev.ipaedu.sa:8082/getRfcSpecializedDepartments');
  }
}
