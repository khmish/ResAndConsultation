import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateJSONService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:max-line-length
  sendJSONAndGetAllData(dsId1: string, dsProcessVariableValues1: Map<string, string>, dsProcessFilterFunctionValues1: Map<string, string>, processDefinitionKey1: string) {
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
}
