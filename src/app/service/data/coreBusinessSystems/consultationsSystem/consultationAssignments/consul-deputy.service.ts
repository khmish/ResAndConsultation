import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsulDeputyService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };

  constructor(private http: HttpClient) {
  }

  c3Task07ConsDeputyDesignApproval(constId1: string,
                                   consDeputyDesignApproved1: boolean,
                                   remarks1: string,
                                   userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c3Task07ConsDeputyDesignApproval', {
      constId: constId1,
      consDeputyDesignApproved: consDeputyDesignApproved1,
      remarks: remarks1,
      userId: userId1
    }, this.httpOptions);
  }

  c4Task04DeputyApproveFinancialRec(constId1: string,
                                    remarks1: string,
                                    userId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c4Task04DeputyApproveFinancialRec', {
      constId: constId1,
      remarks: remarks1,
      userId: userId1
    }, this.httpOptions);
  }
}
