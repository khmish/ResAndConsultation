import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsulIPAGMNewConsultationsComponent} from './consul-ipagmnew-consultations.component';

const routes: Routes = [
  {
    path: '',
    component: ConsulIPAGMNewConsultationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsulIpagmnewConsultationsRoutingModule {}
