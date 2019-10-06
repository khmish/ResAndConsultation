import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsulIhrnewService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };

  // tslint:disable-next-line:max-line-length
  hrDecisions(constId1: string, consultationTeamHrDecisionAttachmentPath1: string, scientificReviewTeamHrDecisionAttachmentPath1: string,
                     // tslint:disable-next-line:max-line-length
              diagnosticTeamHrDecisionAttachmentPath1: string, conslAttType1: string, scienRevAttType1: string, diagAttType1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/hrIssueDecisionsTask08', {
      constId: constId1,
      consultationTeamHrDecisionAttachmentPath: consultationTeamHrDecisionAttachmentPath1,
      scientificReviewTeamHrDecisionAttachmentPath: scientificReviewTeamHrDecisionAttachmentPath1,
      diagnosticTeamHrDecisionAttachmentPath: diagnosticTeamHrDecisionAttachmentPath1,
      conslAttType: conslAttType1,
      scienRevAttType: scienRevAttType1,
      diagAttType: diagAttType1,
      userId: sessionStorage.getItem('authenticatedUser')
    }, this.httpOptions);
  }
}
