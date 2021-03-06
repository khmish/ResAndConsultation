import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule, CardModule, ConfirmDialogModule, DropdownModule, FieldsetModule, PanelModule, ToolbarModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {SpecDeptNewConsultationsRoutingModule} from './spec-dept-new-consultations-routing.module';
import {SpecDeptNewConsultationsComponent} from './spec-dept-new-consultations.component';
import {TranslateModule} from '@ngx-translate/core';
import {DataViewModule} from 'primeng/dataview';
// tslint:disable-next-line:max-line-length
import {ConsultationFullDetailsComponent} from '../../../../reusableComponents/consultation-full-details/consultation-full-details.component';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [CommonModule, SpecDeptNewConsultationsRoutingModule, ToolbarModule, TableModule, ButtonModule, ToastModule, TranslateModule, PanelModule,
    FieldsetModule, CardModule, DataViewModule, ConfirmDialogModule, DropdownModule],
  exports: [
    ConsultationFullDetailsComponent
  ],
  declarations: [SpecDeptNewConsultationsComponent, ConsultationFullDetailsComponent]
})
export class SpecDeptNewConsultationsModule {}
