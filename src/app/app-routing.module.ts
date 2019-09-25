import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared';
import {ConsultationComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/gmNewRfcs/addNewRfcGM/consultation.component';
// tslint:disable-next-line:max-line-length
import {StudyneedandbusscenterComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/gmNewRfcs/studyneedandbusscenter/studyneedandbusscenter.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
// tslint:disable-next-line:max-line-length
import {NewRfcsDeputyReviewComponent} from './coreBusinessSystems/consultationsSystem/rfcsSubSystem/deputyNewRfcs/new-rfcs-deputy-review/new-rfcs-deputy-review.component';
// tslint:disable-next-line:max-line-length

const routes: Routes = [
  {path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard]},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'addNewRfcGM', component: ConsultationComponent},
  {path: 'studyNeedAndBussCenter', component: StudyneedandbusscenterComponent},
  {path: 'newRfcsDeputyReview', component: NewRfcsDeputyReviewComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
