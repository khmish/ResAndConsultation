import {Component, OnDestroy, OnInit} from '@angular/core';
import {RfcFieldsLovsListService} from '../../../../../service/data/rfc-fields-lovs-list.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConsultationserviceService} from './consultationservice.service';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {ViewallconsultationComponent} from '../viewallconsultation.component';
import {UserAccessService} from '../../../../../service/user-access.service';
import {
  SystemFunctionDsQueryHttpBody,
  UserPrivilagesHttpBody
} from '../../../../../service/data/httpBodies/user-privilages-http-body.service';

export class RfcFieldLovs {
  constructor(
    public code: string,
    public arabicDescription: string,
    public englishDescription: string) {
  }
}

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit, OnDestroy {

  orgId = '';
  orgNameAr = '';
  orgNameEn = '';
  contactName = '';
  currJob = '';
  currPhone = '';
  currEmail = '';
  resField = '';
  consultationTitle = '';
  consultationDesc = '';

  allRfcItems: RfcFieldLovs[];
  selected = null;

  organization: any;

  isOrgPresent: boolean;

  filteredOrganizationSingle: any[];

  newConsultationForm: FormGroup;

  submitted = false;

  errorMessage: string;
  errorOccurred = false;

  userPrivilagesHttpBody: UserPrivilagesHttpBody;

  systemFunctionDsQueryHttpBody: Array<SystemFunctionDsQueryHttpBody>;

  constructor(private formBuilder: FormBuilder,
              private rfcService: RfcFieldsLovsListService,
              private conService: ConsultationserviceService,
              public router: Router,
              private viewAllConsul: ViewallconsultationComponent,
              public userAccessService: UserAccessService) {
  }

  ngOnInit(): void {
    this.allRfcItems = [];
    this.isOrgPresent = false;
    this.rfcService.executeRfcFieldsLovsListService().subscribe(res => {
      this.allRfcItems = res;
      console.log(this.allRfcItems);
    });
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-blue sidebar-mini';

    // this.newConsultationForm = new FormGroup({
    //   orgListAr: new FormControl(),
    //   orgNameEnV: new FormControl(),
    //   contactNameV : new FormControl(),
    //   curJobV: new FormControl(),
    //   curPhoneV: new FormControl(),
    //   curEmailV: new FormControl()
    // });

    this.newConsultationForm = this.formBuilder.group({
      orgListAr: ['', Validators.required],
      orgNameEnV: ['', Validators.required],
      contactNameV: ['', Validators.required],
      curJobV: ['', Validators.required],
      curPhoneV: ['', Validators.required],
      curEmailV: ['', [Validators.required, Validators.email]],
      selectedV: ['', Validators.required],
      consultationTitleV: ['', Validators.required],
      consultationDescV: ['', Validators.required]
    });
  }

  get f() {
    return this.newConsultationForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.newConsultationForm.reset();
    this.viewAllConsul.refreshPage();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newConsultationForm.invalid) {
      return;
    }

    this.addNewConsultation();
  }

  addNewConsultation() {
    console.log(this.organization);
    console.log(this.isOrgPresent);
    if (this.isOrgPresent) {
      this.orgNameAr = this.organization !== null ? this.organization.arabicName : null;
    } else {
      this.orgNameAr = this.organization;
    }
    console.log(this.orgId);
    console.log(this.orgNameAr);
    console.log(this.orgNameEn);
    console.log(this.contactName);
    console.log(this.currJob);
    console.log(this.currPhone);
    console.log(this.currEmail);
    console.log(this.consultationTitle);
    console.log(this.consultationDesc);
    console.log(this.selected !== null ? this.selected.code : null);
    this.resField = this.selected !== null ? this.selected.code : null;

    this.conService.addNewConsultation(this.orgId,
      this.orgNameAr,
      this.orgNameEn,
      this.contactName,
      this.currJob,
      this.currPhone,
      this.currEmail,
      this.resField,
      this.consultationTitle,
      this.consultationDesc).subscribe((res: HttpResponse<any>) => {
      const errorCode = res.body.errorCode;
      console.log('errorCode -------------> ' + errorCode);
      if (errorCode === '0') {
        this.errorOccurred = false;
        this.viewAllConsul.showSuccess('Consultation Added Successfully');
        this.refreshGMAllConsultationRequests();
      } else {
        this.errorOccurred = true;
        console.log(res.body.errorEDescription);
        this.errorMessage = res.body.errorEDescription;
        this.viewAllConsul.showError(this.errorMessage);
      }
    }, error => {
      // console.log(error.errorMessage);
      this.errorMessage = 'Service is down';
      console.log(this.errorMessage);
      this.viewAllConsul.showError(this.errorMessage);
    });
  }

  filteredOrganizationsSingle(event) {
    let query = event.query;
    this.conService.getAllOrganizations().then(organizations => {
      this.filteredOrganizationSingle = this.filterOrg(query, organizations);
    });
  }

  filterOrg(query, organizations: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < organizations.length; i++) {
      let org = organizations[i];
      if (org.arabicName.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(org);
      }
    }
    if (filtered.length === 0) {
      this.isOrgPresent = false;
    } else {
      this.isOrgPresent = true;
    }
    return filtered;
  }

  getSelectedOrg() {
    console.log(this.organization);
    this.orgId = this.organization.orgId;
    this.orgNameAr = this.organization.arabicName;
    this.orgNameEn = this.organization.englishName;
    this.contactName = this.organization.contactName;
    this.currJob = this.organization.contactJob;
    this.currPhone = this.organization.contactPhone;
    this.currEmail = this.organization.contactEmail;

  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

  changeDocumentTheme(themeName: string) {
    window.dispatchEvent(new Event('resize'));
    document.body.className = themeName;
  }

  get fval() {
    return this.newConsultationForm.controls;
  }

  signup() {
    this.submitted = true;
    if (this.newConsultationForm.invalid) {
      return;
    }
  }

  private refreshGMAllConsultationRequests() {
    this.viewAllConsul.dialogService.dialogComponentRef.destroy();
    this.viewAllConsul.ngOnInit();
  }
}
