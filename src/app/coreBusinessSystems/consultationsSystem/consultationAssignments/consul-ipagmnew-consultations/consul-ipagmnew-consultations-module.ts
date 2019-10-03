import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule, ConfirmDialogModule, DropdownModule, ToolbarModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {TranslateModule} from '@ngx-translate/core';
import {ConsulIpagmnewConsultationsRoutingModule} from './consul-ipagmnew-consultations-routing.module';
import {ConsulIPAGMNewConsultationsComponent} from './consul-ipagmnew-consultations.component';
import {SpecDeptNewConsultationsModule} from '../spec-dept-new-consultations/spec-dept-new-consultations-module';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [CommonModule, ConsulIpagmnewConsultationsRoutingModule, ToolbarModule, TableModule, ButtonModule, ToastModule, TranslateModule, SpecDeptNewConsultationsModule, DropdownModule, ConfirmDialogModule],
  declarations: [ConsulIPAGMNewConsultationsComponent]
})
export class ConsulIpagmnewConsultationsModule {}
