import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewResultAndFinalDecisionService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };

  // tslint:disable-next-line:max-line-length
  sendJSONDataAndGetAllConsGMFinalRfc(dsId1: string, dsProcessVariableValues1: Map<string, string>, dsProcessFilterFunctionValues1: Map<string, string>) {
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

  updateReviewResultAndFinalDecision(rfcId1: string,
                                     execRfc1: string,
                                     businessCenter1: string,
                                     remarks1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/updateTask08', {
      rfcId: rfcId1,
      execRfc: execRfc1,
      businessCenter: businessCenter1,
      remarks: remarks1
    }, this.httpOptions);
  }
}
