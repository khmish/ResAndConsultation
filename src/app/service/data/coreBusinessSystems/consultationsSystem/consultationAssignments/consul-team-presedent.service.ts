import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsulTeamPresedentService {

  constructor(private http: HttpClient) {
  }

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

  c2Task04SendConsultationReportForApproval(constId1: string,
                                            consReportAttachmentPath1: string,
                                            userId1: string,
                                            conslAttType1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task04SendConsultationReportForApproval', {
      constId: constId1,
      consReportAttachmentPath: consReportAttachmentPath1,
      userId: userId1,
      conslAttType: conslAttType1
    }, this.httpOptions);
  }

  c2Task06SubmitScientificReviewReport(constId1: string,
                                       scientificReviewApproval1: boolean,
                                       planAttachmentPath1: string,
                                       consAttType1: string,
                                       userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task06SubmitScientificReviewReport', {
      constId: constId1,
      scientificReviewApproval: scientificReviewApproval1,
      planAttachmentPath: planAttachmentPath1,
      consAttType: consAttType1,
      userId: userId1
    }, this.httpOptions);
  }

  c2Task07SubmitCorrectedReport(constId1: string,
                                correctedReportAttachmentPath1: string,
                                userId1: string,
                                consAttType1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task07SubmitCorrectedReport', {
      constId: constId1,
      correctedReportAttachmentPath: correctedReportAttachmentPath1,
      userId: userId1,
      consAttType: consAttType1
    }, this.httpOptions);
  }
  c2Task12ReviewProofReadingRemarks(constId1: string,
                                    reviewesConsReportPath1: string,
                                    attachmentType1: string,
                                    userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c2Task12ReviewProofReadingRemarks', {
      constId: constId1,
      reviewesConsReportPath: reviewesConsReportPath1,
      attachmentType: attachmentType1,
      userId: userId1
    }, this.httpOptions);
  }
}
