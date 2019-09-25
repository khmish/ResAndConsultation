import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'prefix' },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      // tslint:disable-next-line:max-line-length
      { path: 'allConsultations', loadChildren: () => import('../coreBusinessSystems/consultationsSystem/rfcsSubSystem/gmNewRfcs/viewallconsultation-module').then(m => m.ViewallconsultationModule)},
      // tslint:disable-next-line:max-line-length
      { path: 'deputyNewRfcs', loadChildren: () => import('../coreBusinessSystems/consultationsSystem/rfcsSubSystem/deputyNewRfcs/deputy-new-rfcs-module').then(m => m.DeputyNewRfcsModule)},
      // tslint:disable-next-line:max-line-length
      { path: 'consulGmNewRfcs', loadChildren: () => import('../coreBusinessSystems/consultationsSystem/rfcsSubSystem/consul-gm-new-rfcs/consul-gm-new-rfcs-module').then(m => m.ConsulGmNewRfcsModule)},
      // tslint:disable-next-line:max-line-length
      { path: 'specDeptAndCommNewRfcs', loadChildren: () => import('../coreBusinessSystems/consultationsSystem/rfcsSubSystem/spec-dept-and-comm-rfcs/spec-dept-and-comm-rfcs-module').then(m => m.SpecDeptAndCommRfcsModule)},
      // tslint:disable-next-line:max-line-length
      { path: 'secDefinitions', loadChildren: () => import('../adminSystems/securitySystem/privlegeManagement/security-definition/security-definition-module').then(m => m.SecurityDefinitionModule)},
      // tslint:disable-next-line:max-line-length
      { path: 'usrPrivleges', loadChildren: () => import('../adminSystems/securitySystem/privlegeManagement/user-privleges/user-privleges-module').then(m => m.UserPrivlegesModule)},
      // tslint:disable-next-line:max-line-length
      { path: 'consulGMNewConsultations', loadChildren: () => import('../coreBusinessSystems/consultationsSystem/consultationAssignments/consul-gm-new-consultations/consul-gm-new-consultations-module').then(m => m.ConsulGmNewConsultationsModule)},
      // tslint:disable-next-line:max-line-length
      { path: 'specDeptNewConsultations', loadChildren: () => import('../coreBusinessSystems/consultationsSystem/consultationAssignments/spec-dept-new-consultations/spec-dept-new-consultations-module').then(m => m.SpecDeptNewConsultationsModule)},
      // tslint:disable-next-line:max-line-length
      { path: 'consulDeputyNewConsultations', loadChildren: () => import('../coreBusinessSystems/consultationsSystem/consultationAssignments/consul-deputy-new-consultations/consul-deputy-new-consultations-module').then(m => m.ConsulDeputyNewConsultationsModule)},
      // tslint:disable-next-line:max-line-length
      { path: 'consulIPAGMNewConsultations', loadChildren: () => import('../coreBusinessSystems/consultationsSystem/consultationAssignments/consul-ipagmnew-consultations/consul-ipagmnew-consultations-module').then(m => m.ConsulIpagmnewConsultationsModule)},
      // tslint:disable-next-line:max-line-length
      { path: 'consulIHRNewConsultations', loadChildren: () => import('../coreBusinessSystems/consultationsSystem/consultationAssignments/consul-ihrnew-consultations/consul-ihrnew-consultations-module').then(m => m.ConsulIhrnewConsultationsModule)},

      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
