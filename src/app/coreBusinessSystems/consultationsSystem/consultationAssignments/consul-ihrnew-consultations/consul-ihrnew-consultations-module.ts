import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule, DropdownModule, ToolbarModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {TranslateModule} from '@ngx-translate/core';
import {ConsulIHRNewConsultationsComponent} from './consul-ihrnew-consultations.component';
import {ConsulIhrnewConsultationsRoutingModule} from './consul-ihrnew-consultations-routing.module';
import {SpecDeptNewConsultationsModule} from '../spec-dept-new-consultations/spec-dept-new-consultations-module';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [CommonModule, ConsulIhrnewConsultationsRoutingModule, ToolbarModule, TableModule, ButtonModule, ToastModule, TranslateModule, SpecDeptNewConsultationsModule, DropdownModule],
  declarations: [ConsulIHRNewConsultationsComponent]
})
export class ConsulIhrnewConsultationsModule {}
