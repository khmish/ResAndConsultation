import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsulIPAGMService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };

  reviewConsultation(constId1: any, consulIPAGmRemarks1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/ipaGMReviewAndProcessTask04', {
      constId: constId1,
      consulIPAGmRemarks: consulIPAGmRemarks1
    }, this.httpOptions);
  }
}
