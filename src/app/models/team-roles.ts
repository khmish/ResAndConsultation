import {Injectable} from '@angular/core';

@Injectable()
export class TeamRoles {
}

export class GetActivityRolesResponseHttpBody {
  constructor(
    public teamRoleHttpBody: Array<TeamRoleHttpBody>,
    public errorMsg: ErrorMessage,
  ) {
  }
}


export class TeamRoleHttpBody {
  constructor(
    teamRoleId: string,
    teamRoleAName: string,
    teamRoleEName: string
  ) {
  }
}

export class ErrorMessage {
  constructor(
    public errorCode: string,
    public errorADescription: string,
    public errorEDescription: string
  ) {
  }
}
