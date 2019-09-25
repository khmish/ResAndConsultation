import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RfcFullDetailsBody} from '../../reusableComponents/rfc-full-details/rfc-full-details.component';

@Injectable({
  providedIn: 'root'
})
export class ConsulFullDetailsService {

  constructor(private http: HttpClient) {
  }

  getConsulFullDetails(constId1: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response' as 'response'
    };
    // tslint:disable-next-line:max-line-length
    return this.http.post<RfcFullDetailsBody>('http://springdev.ipaedu.sa:8082/getConsultstionFullDetails', {
      constId: constId1
    }, httpOptions);
  }
}
