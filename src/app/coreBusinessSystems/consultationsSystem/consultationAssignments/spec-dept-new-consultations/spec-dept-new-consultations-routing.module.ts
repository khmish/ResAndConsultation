import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpecDeptNewConsultationsComponent} from './spec-dept-new-consultations.component';

const routes: Routes = [
  {
    path: '',
    component: SpecDeptNewConsultationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecDeptNewConsultationsRoutingModule {}
