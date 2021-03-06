import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ButtonModule, ToolbarModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {SecurityDefinitionRoutingModule} from './security-definition-routing.module';
import {SecurityDefinitionComponent} from './security-definition.component';

@NgModule({
  imports: [CommonModule, SecurityDefinitionRoutingModule, ToolbarModule, TableModule, ButtonModule, ToastModule,FormsModule],
  declarations: [SecurityDefinitionComponent]
})
export class SecurityDefinitionModule {
  

}
