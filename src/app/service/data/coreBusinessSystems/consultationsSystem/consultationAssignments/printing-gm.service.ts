import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrintingGMService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };

  reviewReport(constId1: string) {
    return this.http.post('http://springdev.ipaedu.sa:8082/c3Task11ReportPrint', {
      constId: constId1
    }, this.httpOptions);
  }
}
