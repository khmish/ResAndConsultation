import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule, ToolbarModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ConsulGmNewConsultationsRoutingModule} from './consul-gm-new-consultations-routing.module';
import {ConsulGmNewConsultationsComponent} from './consul-gm-new-consultations.component';
import {TranslateModule} from '@ngx-translate/core';
import {SpecDeptNewConsultationsModule} from '../spec-dept-new-consultations/spec-dept-new-consultations-module';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { AcceptRejectReviewComponent } from './accept-reject-review/accept-reject-review.component'
import { ReviewAfterDeputyRemarkComponent } from './review-after-deputy-remark/review-after-deputy-remark.component'



@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [FormsModule, CommonModule, ConsulGmNewConsultationsRoutingModule, ToolbarModule, TableModule, ButtonModule, ToastModule, TranslateModule, SpecDeptNewConsultationsModule,
    DialogModule, InputTextareaModule],
  declarations: [ConsulGmNewConsultationsComponent,AcceptRejectReviewComponent, ReviewAfterDeputyRemarkComponent],
  entryComponents: [AcceptRejectReviewComponent, ReviewAfterDeputyRemarkComponent]

})
export class ConsulGmNewConsultationsModule {}
