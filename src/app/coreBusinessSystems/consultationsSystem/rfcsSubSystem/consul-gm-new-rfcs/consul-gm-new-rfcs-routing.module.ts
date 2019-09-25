import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsulGmNewRfcsComponent} from './consul-gm-new-rfcs.component';

const routes: Routes = [
  {
    path: '',
    component: ConsulGmNewRfcsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsulGmNewRfcsRoutingModule {}
