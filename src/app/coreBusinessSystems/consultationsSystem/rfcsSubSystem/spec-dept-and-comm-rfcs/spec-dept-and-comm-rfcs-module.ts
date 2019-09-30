import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AccordionModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FieldsetModule,
  PanelModule,
  SidebarModule,
  ToolbarModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ConsulGmNewRfcsModule} from '../consul-gm-new-rfcs/consul-gm-new-rfcs-module';
import {SpecDeptAndCommRfcsComponent} from './spec-dept-and-comm-rfcs.component';
import {SpecDeptAndCommRfcsRoutingModule} from './spec-dept-and-comm-rfcs-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {RfcFullDetailsComponent} from '../../../../reusableComponents/rfc-full-details/rfc-full-details.component';
import {DataViewModule} from 'primeng/dataview';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [CommonModule, SpecDeptAndCommRfcsRoutingModule, ToolbarModule, TableModule, ButtonModule, ToastModule, AccordionModule, FieldsetModule,
    PanelModule, CardModule, SidebarModule, TranslateModule, DataViewModule, ConsulGmNewRfcsModule, DropdownModule],
  exports: [
  ],
  declarations: [SpecDeptAndCommRfcsComponent]
})
export class SpecDeptAndCommRfcsModule {}
