import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateConsultationRecordService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };

  // tslint:disable-next-line:max-line-length
  sendJSONDataAndGetAllConsGMCreateRecordRfc(dsId1: string, dsProcessVariableValues1: Map<string, string>, dsProcessFilterFunctionValues1: Map<string, string>) {
    console.log(dsId1);
    console.log(dsProcessVariableValues1);
    console.log(dsProcessFilterFunctionValues1);

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
      dsProcessFilterFunctionValues: functionsMap
    }, this.httpOptions);
  }


  createConsultationRecord(rfcId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/updateTask10', {
      rfcId: rfcId1,
      userId: sessionStorage.getItem('authenticatedUser')
    }, this.httpOptions);
  }
}
