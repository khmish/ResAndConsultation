import {Injectable} from '@angular/core';

@Injectable()
export class ActivityTypes {
}

export class ActivityTypesResponseHttpBody {
  constructor(
    public activityHttpBody: Array<ActivityTypeHttpBody>,
    public errorMsg: ErrorMessage,
  ) {
  }
}

export class ActivityTypeHttpBody {
  constructor(
    private actTypeCode: string,
    private actTypeArabicName: string,
    private actTypeEnglishName: string) {

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
