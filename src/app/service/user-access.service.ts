import {Injectable} from '@angular/core';
import {SystemFunctionDsQueryHttpBody, UserPrivilagesHttpBody} from './data/httpBodies/user-privilages-http-body.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {
  private userPrivilagesHttpBody: UserPrivilagesHttpBody;
  private systemFunctionDsQueryHttpBodies: Array<SystemFunctionDsQueryHttpBody>;

  constructor() {
  }

  getUserPrivilagesHttpBody() {
    return this.userPrivilagesHttpBody;
  }

  getSystemFunctionDsQueryHttpBody() {
    return this.systemFunctionDsQueryHttpBodies;
  }

  setUserPrivilagesHttpBody(userPrivilagesHttpBody: UserPrivilagesHttpBody) {
    this.userPrivilagesHttpBody = userPrivilagesHttpBody;
  }

  setSystemFunctionDsQueryHttpBodies(systemFunctionDsQueryHttpBodies: Array<SystemFunctionDsQueryHttpBody>) {
    this.systemFunctionDsQueryHttpBodies = systemFunctionDsQueryHttpBodies;
  }


}
