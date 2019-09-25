import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserPrivilagesHttpBody} from './httpBodies/user-privilages-http-body.service';

@Injectable({
  providedIn: 'root'
})
export class FunctiontreeserviceService {

  constructor(private http: HttpClient) {
  }

  getAllUserRoles() {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response' as 'response'
    };
    console.log(sessionStorage.getItem('username'));
    // tslint:disable-next-line:max-line-length
    return this.http.get<UserPrivilagesHttpBody>('http://springdev.ipaedu.sa:8084/getUserPrivileges/' + sessionStorage.getItem('authenticatedUser'), httpOptions);
  }
}
