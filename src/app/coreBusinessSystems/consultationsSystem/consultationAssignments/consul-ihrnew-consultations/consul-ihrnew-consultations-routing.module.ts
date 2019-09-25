import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsulIHRNewConsultationsComponent} from './consul-ihrnew-consultations.component';

const routes: Routes = [
  {
    path: '',
    component: ConsulIHRNewConsultationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsulIhrnewConsultationsRoutingModule {}
