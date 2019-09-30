import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule, DialogService, DropdownModule, SidebarModule, ToolbarModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {DeputyNewRfcsRoutingModule} from './deputy-new-rfcs-routing.module';
import {DeputyNewRfcsComponent} from './deputy-new-rfcs.component';
import {ToastModule} from 'primeng/toast';
import {AppModule} from '../../../../app.module';
import {ConsulGmNewRfcsModule} from '../consul-gm-new-rfcs/consul-gm-new-rfcs-module';
import {ViewallconsultationModule} from '../gmNewRfcs/viewallconsultation-module';
import {LanguageTranslationModule} from '../../../../shared/modules/language-translation/language-translation.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [CommonModule, DeputyNewRfcsRoutingModule, ToolbarModule, TableModule, ButtonModule, ToastModule, SidebarModule, ConsulGmNewRfcsModule, ViewallconsultationModule, DropdownModule, TranslateModule],
  declarations: [DeputyNewRfcsComponent]
})
export class DeputyNewRfcsModule {}
