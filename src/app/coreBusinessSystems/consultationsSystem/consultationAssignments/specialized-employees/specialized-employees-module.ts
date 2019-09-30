import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule, DropdownModule, ToolbarModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {TranslateModule} from '@ngx-translate/core';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { SpecializedEmployeesComponent} from './specialized-employees.component';
import {SpecializedEmployeesRoutingModule} from './specialized-employees-routing.module';
import {SpecDeptNewConsultationsModule} from '../spec-dept-new-consultations/spec-dept-new-consultations-module';



@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [FormsModule, CommonModule, ToolbarModule, TableModule, ButtonModule, ToastModule, TranslateModule,
    DialogModule, InputTextareaModule, DropdownModule, SpecializedEmployeesRoutingModule, SpecDeptNewConsultationsModule],
  declarations: [SpecializedEmployeesComponent],
  entryComponents: []

})
export class SpecializedEmployeesModule {}
