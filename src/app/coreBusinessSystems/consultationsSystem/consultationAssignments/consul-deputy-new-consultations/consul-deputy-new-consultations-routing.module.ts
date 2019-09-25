import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsulDeputyNewConsultationsComponent} from './consul-deputy-new-consultations.component';

const routes: Routes = [
  {
    path: '',
    component: ConsulDeputyNewConsultationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsulDeputyNewConsultationsRoutingModule {}
