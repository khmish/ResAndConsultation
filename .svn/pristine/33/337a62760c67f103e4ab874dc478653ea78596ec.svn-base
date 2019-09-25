import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {SpecDeptNewrfcsService} from '../../../../../service/data/spec-dept-newrfcs.service';
import {SpecDeptAndCommRfcsComponent} from '../spec-dept-and-comm-rfcs.component';

export class GetSpecEmployeesDataBean {
  constructor(
    // tslint:disable-next-line:variable-name
    public arabic_FAMILY_NAME: string,
    // tslint:disable-next-line:variable-name
    public arabic_FATHER_NAME: string,
    // tslint:disable-next-line:variable-name
    public arabic_FIRST_NAME: string,
    // tslint:disable-next-line:variable-name
    public arabic_GDFTHER_NAME: string,
    // tslint:disable-next-line:variable-name
    public crnt_EMPL_STATUS_CODE: string,
    // tslint:disable-next-line:variable-name
    public empl_CODE: string,
    // tslint:disable-next-line:variable-name
    public ipa_END_DATE: string,
    // tslint:disable-next-line:variable-name
    public sex_CODE_FLAG: string
  ) {
  }
}

@Component({
  selector: 'app-getdepartmentemployees',
  templateUrl: './getdepartmentemployees.component.html',
  styleUrls: ['./getdepartmentemployees.component.scss']
})
export class GetdepartmentemployeesComponent implements OnInit {

  cols: any[];
  allDeptEmployees: GetSpecEmployeesDataBean[];

  selectedEmp: GetSpecEmployeesDataBean;
  selectedEmp1: GetSpecEmployeesDataBean;
  selectedRfcId: string;

  employeeDept: string;
  specEmplAssignForm: FormGroup;
  submitted = false;

  // tslint:disable-next-line:max-line-length
  constructor(private specDeptNewRfc: SpecDeptAndCommRfcsComponent, public specDeptRfcService: SpecDeptNewrfcsService) {
  }

  ngOnInit() {
    this.selectedRfcId = this.specDeptNewRfc.selRow;
    this.employeeDept = this.specDeptNewRfc.departmentCode;

    // this.specEmplAssignForm = this.formBuilder.group({
    //   selectedEmpV: ['', Validators.required]
    // });

    this.specDeptRfcService.fetchAllEmployees(this.selectedRfcId, this.employeeDept).subscribe((res: HttpResponse<any>) => {
      this.allDeptEmployees = res.body;
      console.log(this.allDeptEmployees);
    });

    this.cols = [
      {field: 'arabic_FIRST_NAME', header: 'Employee Name'}
    ];
  }

  // get f() {
  //   return this.specEmplAssignForm.controls;
  // }

  onReset() {
    // this.submitted = false;
    // this.specEmplAssignForm.reset();
    this.specDeptNewRfc.refreshPage();
  }

  onSubmit() {
    // this.submitted = true;
    // stop here if form is invalid
    // if (this.specEmplAssignForm.invalid) {
    //   return;
    // }
    const selEmp = this.selectedEmp ? this.selectedEmp.empl_CODE : 'none';
    console.log(selEmp);
    if (selEmp === 'none') {
      this.specDeptNewRfc.showError('Please select employee');
      return;
    }
    this.updateAssignEmployee();

  }

  private updateAssignEmployee() {
    console.log(this.selectedRfcId + '-' + this.selectedEmp.empl_CODE);
    this.specDeptRfcService.assignRfcToEmployee(this.selectedRfcId, this.selectedEmp.empl_CODE).subscribe((res: HttpResponse<any>) => {
      console.log(res.body);
      if (res.body.errorCode === '0') {
        this.specDeptNewRfc.dialogService.dialogComponentRef.destroy();
        this.specDeptNewRfc.ngOnInit();
        this.specDeptNewRfc.showSuccess('Employee Assigned Successfully');
      } else {
        console.log(res.body.errorEDescription);
        this.specDeptNewRfc.showError(res.body.errorEDescription);
      }
    }, error => {
      this.specDeptNewRfc.showError('Service is down');
    });
  }
}
