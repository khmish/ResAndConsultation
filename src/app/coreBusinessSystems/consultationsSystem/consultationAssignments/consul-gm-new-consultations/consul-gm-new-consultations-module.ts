import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule, ToolbarModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ConsulGmNewConsultationsRoutingModule} from './consul-gm-new-consultations-routing.module';
import {ConsulGmNewConsultationsComponent} from './consul-gm-new-consultations.component';
import {TranslateModule} from '@ngx-translate/core';
import {SpecDeptNewConsultationsModule} from '../spec-dept-new-consultations/spec-dept-new-consultations-module';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [CommonModule, ConsulGmNewConsultationsRoutingModule, ToolbarModule, TableModule, ButtonModule, ToastModule, TranslateModule, SpecDeptNewConsultationsModule],
  declarations: [ConsulGmNewConsultationsComponent]
})
export class ConsulGmNewConsultationsModule {}
