import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewallconsultationRoutingModule } from './viewallconsultation-routing.module';
import {ViewallconsultationComponent} from './viewallconsultation.component';
import {ButtonModule, CardModule, DropdownModule, FieldsetModule, PanelModule, SidebarModule, ToolbarModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ConsulGmNewRfcsModule} from '../consul-gm-new-rfcs/consul-gm-new-rfcs-module';
import {RfcFullDetailsComponent} from '../../../../reusableComponents/rfc-full-details/rfc-full-details.component';
import {DataViewModule} from 'primeng/dataview';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [CommonModule, ViewallconsultationRoutingModule, ToolbarModule, TableModule, ButtonModule, ToastModule, SidebarModule, ConsulGmNewRfcsModule, DataViewModule, PanelModule, FieldsetModule, CardModule, TranslateModule, DropdownModule],
  exports: [
  ],
  declarations: [ViewallconsultationComponent]
})
export class ViewallconsultationModule {}
