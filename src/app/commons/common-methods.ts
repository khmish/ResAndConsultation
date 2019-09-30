import {Injectable} from '@angular/core';
import {SystemFunctionDsQueryHttpBody} from '../service/data/httpBodies/user-privilages-http-body.service';

@Injectable()
export class CommonMethods {
  constructor() {
  }

  systemFunctionDsQueryHttpBodies: Array<SystemFunctionDsQueryHttpBody>;

  dsId: string;
  dsProcessVariables: string;
  dsProcessFilterFunctions: string;

  dsProcessVariablesSplitedArray: string[];
  dsProcessFilterFunctionsSplittedArray: string[];


  daFinalVariables = new Map();
  daFinalFilterFunctions = new Map();
  processDefinitionKey: string;

  finalJSON = new Map();

  public createJSONFromString(httpBody: Array<SystemFunctionDsQueryHttpBody>) {

    // console.log('Inside createJSONFromString ------------------> ');
    this.systemFunctionDsQueryHttpBodies = httpBody;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.systemFunctionDsQueryHttpBodies.length; i++) {
      console.log(this.systemFunctionDsQueryHttpBodies[i].dsId);
      console.log(this.systemFunctionDsQueryHttpBodies[i].dsProcessVariables);
      console.log(this.systemFunctionDsQueryHttpBodies[i].dsProcessFilterFunctions);
      console.log(this.systemFunctionDsQueryHttpBodies[i].processDefinitionKey);

      this.dsId = this.systemFunctionDsQueryHttpBodies[i].dsId;
      this.dsProcessVariables = this.systemFunctionDsQueryHttpBodies[i].dsProcessVariables;
      this.dsProcessFilterFunctions = this.systemFunctionDsQueryHttpBodies[i].dsProcessFilterFunctions;
      this.processDefinitionKey = this.systemFunctionDsQueryHttpBodies[i].processDefinitionKey;


      if (this.dsProcessVariables === null) {
        this.dsProcessVariables = null;
      } else {
        this.dsProcessVariablesSplitedArray = this.dsProcessVariables.split(';');
        // tslint:disable-next-line:prefer-for-of no-shadowed-variable
        for (let i = 0; i < this.dsProcessVariablesSplitedArray.length; i++) {
          // console.log(this.dsProcessVariablesSplitedArray[i]);
          this.daFinalVariables.set(this.dsProcessVariablesSplitedArray[i], '0201610');
        }
      }

      if (this.dsProcessFilterFunctions === null) {
        this.daFinalFilterFunctions = null;
      } else {
        // tslint:disable-next-line:max-line-length
        this.dsProcessFilterFunctionsSplittedArray = this.dsProcessFilterFunctions.split(';');
        // console.log('this.dsProcessFilterFunctionsSplittedArray ------------> ' + this.dsProcessFilterFunctionsSplittedArray);
        // tslint:disable-next-line:prefer-for-of no-shadowed-variable
        for (let i = 0; i < this.dsProcessFilterFunctionsSplittedArray.length; i++) {
          // console.log(this.dsProcessFilterFunctionsSplittedArray[i]);

          this.daFinalFilterFunctions.set(this.dsProcessFilterFunctionsSplittedArray[i].includes('|') ?
            // tslint:disable-next-line:max-line-length
            this.dsProcessFilterFunctionsSplittedArray[i].substring(0, this.dsProcessFilterFunctionsSplittedArray[i].indexOf('|')) :
            this.dsProcessFilterFunctionsSplittedArray[i],
            // tslint:disable-next-line:max-line-length
            this.dsProcessFilterFunctionsSplittedArray[i].substring(0, this.dsProcessFilterFunctionsSplittedArray[i].length).includes('_or') ? null :
              // tslint:disable-next-line:max-line-length
              this.dsProcessFilterFunctionsSplittedArray[i].substring(0, this.dsProcessFilterFunctionsSplittedArray[i].length).includes('taskAssignee') ? sessionStorage.getItem('authenticatedUser') :
                // tslint:disable-next-line:max-line-length
                this.dsProcessFilterFunctionsSplittedArray[i].substring(0, this.dsProcessFilterFunctionsSplittedArray[i].length).includes('taskUnassigned') ? null :
                  // tslint:disable-next-line:max-line-length
                  this.dsProcessFilterFunctionsSplittedArray[i].substring(0, this.dsProcessFilterFunctionsSplittedArray[i].length).includes('endOr') ? null :
                    // tslint:disable-next-line:max-line-length
                    this.dsProcessFilterFunctionsSplittedArray[i].substring(this.dsProcessFilterFunctionsSplittedArray[i].indexOf('|') + 2, this.dsProcessFilterFunctionsSplittedArray[i].length - 1));
        }
        console.log(this.daFinalFilterFunctions);
      }
      this.finalJSON.set(0, this.dsId);
      this.finalJSON.set(1, this.daFinalVariables);
      this.finalJSON.set(2, this.daFinalFilterFunctions);
      this.finalJSON.set(3, this.processDefinitionKey);
      return this.finalJSON;
    }
  }
}
