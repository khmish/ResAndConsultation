import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsulTeamPresidentComponent} from './consul-team-president.component';


const routes: Routes = [
  {
    path: '',
    component: ConsulTeamPresidentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsulTeamPresidentRoutingModule {}
