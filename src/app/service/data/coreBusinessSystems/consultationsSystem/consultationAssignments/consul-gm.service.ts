import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsulGmService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };

  constructor(private http: HttpClient) {
  }

  c3Task05ConsGMReviewDesignedReport(constId1: string,
                                     consultationGMDesignApproved1: boolean,
                                     remarks1: string,
                                     userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c3Task05ConsGMReviewDesignedReport', {
      constId: constId1,
      consultationGMDesignApproved: consultationGMDesignApproved1,
      remarks: remarks1,
      userId: userId1
    }, this.httpOptions);
  }

  c3Task08ConsGMReview(constId1: string,
                       remarks1: string,
                       userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c3Task08ConsGMReview', {
      constId: constId1,
      remarks: remarks1,
      userId: userId1
    }, this.httpOptions);
  }

  c4Task03ConstGMApproveFinancialRec(constId1: string,
                                     remarks1: string,
                                     userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c4Task03ConstGMApproveFinancialRec', {
      constId: constId1,
      remarks: remarks1,
      userId: userId1
    }, this.httpOptions);
  }
}
