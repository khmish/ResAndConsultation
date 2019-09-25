import { HttpClientModule } from '@angular/common/http';
import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  ButtonModule,
  ToolbarModule,
  DialogModule
} from 'primeng/primeng';
import {
  TableModule
} from 'primeng/table';
import {
  ToastModule
} from 'primeng/toast';
import {
  TranslateModule
} from '@ngx-translate/core';
import {
  ConsulDeputyNewConsultationsRoutingModule
} from './consul-deputy-new-consultations-routing.module';
import {
  ConsulDeputyNewConsultationsComponent
} from './consul-deputy-new-consultations.component';

import {
  SpecDeptNewConsultationsModule
} from '../spec-dept-new-consultations/spec-dept-new-consultations-module';
import {
  AcceptRejectReviewComponent
} from '../../rfcsSubSystem/deputyNewRfcs/accept-reject-review/accept-reject-review.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [
    CommonModule,
    ConsulDeputyNewConsultationsRoutingModule,
    ToolbarModule,
    TableModule,
    ButtonModule, 
    ToastModule, 
    TranslateModule, 
    SpecDeptNewConsultationsModule,
    DialogModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [ConsulDeputyNewConsultationsComponent]
})
export class ConsulDeputyNewConsultationsModule {}
