import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewRfcsDeputyReviewServiceService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };

  updateRfcReviewDeputy(rfcId1: string,
                        remarks1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/updateTask02', {
      rfcId: rfcId1,
      remarks: remarks1,
      userId: sessionStorage.getItem('authenticatedUser')
    }, this.httpOptions);
  }
}
