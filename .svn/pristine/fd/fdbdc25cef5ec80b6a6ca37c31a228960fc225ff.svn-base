import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RfcFieldLovs} from '../../coreBusinessSystems/consultationsSystem/rfcsSubSystem/gmNewRfcs/addNewRfcGM/consultation.component';


@Injectable({
  providedIn: 'root'
})
export class RfcFieldsLovsListService {

  constructor(
    private http: HttpClient) {
  }

  // executeRfcFieldsLovsListService(): Observable<RfcListLov[]> {
  //   return this.http.get<RfcListLov[]>('http://localhost:8081/getAllRfcFields').pipe(
  //     map((result: any) => {
  //       return result._embedded.rfcFieldsLovs;
  //     }));
  // }

  executeRfcFieldsLovsListService() {
    return this.http.get<RfcFieldLovs[]>('http://springdev.ipaedu.sa:8082/getAllRfcFields');
  }

}
