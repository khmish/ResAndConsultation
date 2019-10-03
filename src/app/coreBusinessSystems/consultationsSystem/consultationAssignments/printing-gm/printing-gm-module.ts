import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule, ConfirmDialogModule, DropdownModule, ToolbarModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {TranslateModule} from '@ngx-translate/core';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import {PrintingGMComponent} from './printing-gm.component';
import {PrintingGmRoutingModule} from './printing-gm-routing.module';
import {SpecDeptNewConsultationsModule} from '../spec-dept-new-consultations/spec-dept-new-consultations-module';



@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [FormsModule, CommonModule, ToolbarModule, TableModule, ButtonModule, ToastModule, TranslateModule,
    DialogModule, InputTextareaModule, DropdownModule, PrintingGmRoutingModule, SpecDeptNewConsultationsModule, ConfirmDialogModule],
  declarations: [PrintingGMComponent],
  entryComponents: []

})
export class PrintingGmModule {}
