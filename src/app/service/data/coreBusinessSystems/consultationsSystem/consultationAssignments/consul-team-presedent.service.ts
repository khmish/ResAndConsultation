import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsulTeamPresedentService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };
  c2Task01SubmitConsultationPlan(constId1: string,
                                 planAttachmentPath1: string,
                                 userId1: string,
                                 conslAttType1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task01SubmitConsultationPlan', {
      constId: constId1,
      planAttachmentPath: planAttachmentPath1,
      userId: userId1,
      conslAttType: conslAttType1
    }, this.httpOptions);
  }
}
