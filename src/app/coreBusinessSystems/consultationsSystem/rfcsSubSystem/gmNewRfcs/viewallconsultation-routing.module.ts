import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewallconsultationComponent} from './viewallconsultation.component';

const routes: Routes = [
    {
        path: '',
        component: ViewallconsultationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewallconsultationRoutingModule {}
