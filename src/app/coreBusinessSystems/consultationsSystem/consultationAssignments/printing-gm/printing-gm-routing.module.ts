import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrintingGMComponent} from './printing-gm.component';


const routes: Routes = [
  {
    path: '',
    component: PrintingGMComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintingGmRoutingModule {}
