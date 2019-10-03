import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ViewallconsultationserviceService} from './viewallconsultationservice.service';

@Injectable({
  providedIn: 'root'
})
export class StudyneedandbusscenterstudyService {

  constructor(private http: HttpClient, private allCon: ViewallconsultationserviceService) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };

  updateNeedStudyAndBussService(rfcId1: string,
                                needStudy1: string,
                                businessCenter1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/updateNeedStudyAndBussCenter', {
      rfcId: rfcId1,
      needStudy: needStudy1,
      businessCenter: businessCenter1,
      userId: sessionStorage.getItem('authenticatedUser')
    }, this.httpOptions);
  }
}
