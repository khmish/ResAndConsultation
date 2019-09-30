import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpecializedEmployeesComponent} from './specialized-employees.component';

const routes: Routes = [
  {
    path: '',
    component: SpecializedEmployeesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecializedEmployeesRoutingModule {}
