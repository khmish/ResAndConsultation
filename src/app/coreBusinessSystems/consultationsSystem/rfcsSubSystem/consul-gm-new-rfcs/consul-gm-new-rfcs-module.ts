import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule, CardModule, DropdownModule, FieldsetModule, PanelModule, SidebarModule, ToolbarModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ConsulGmNewRfcsRoutingModule} from './consul-gm-new-rfcs-routing.module';
import {ConsulGmNewRfcsComponent} from './consul-gm-new-rfcs.component';
import {ToastModule} from 'primeng/toast';
import {DataViewModule} from 'primeng/dataview';
import {RfcFullDetailsComponent} from '../../../../reusableComponents/rfc-full-details/rfc-full-details.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [CommonModule, ConsulGmNewRfcsRoutingModule, ToolbarModule, TableModule, ButtonModule, ToastModule, DataViewModule, PanelModule, SidebarModule, PanelModule, FieldsetModule, CardModule, DropdownModule, TranslateModule],
  declarations: [ConsulGmNewRfcsComponent, RfcFullDetailsComponent],
  exports: [RfcFullDetailsComponent]
})
export class ConsulGmNewRfcsModule {
}
