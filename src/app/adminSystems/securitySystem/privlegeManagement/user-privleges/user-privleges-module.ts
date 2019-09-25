import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule, ToolbarModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {UserPrivlegesRoutingModule} from './user-privleges-routing.module';
import {UserPrivlegesComponent} from './user-privleges.component';

@NgModule({
  imports: [CommonModule, UserPrivlegesRoutingModule, ToolbarModule, TableModule, ButtonModule, ToastModule],
  declarations: [UserPrivlegesComponent]
})
export class UserPrivlegesModule {}
