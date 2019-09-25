import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeputyNewRfcsComponent} from './deputy-new-rfcs.component';

const routes: Routes = [
    {
        path: '',
        component: DeputyNewRfcsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeputyNewRfcsRoutingModule {}
