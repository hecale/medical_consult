import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './home/dashboard/dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';


const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'patients', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule), canActivate: [AuthGuard] },
    { path: 'doctors', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule), canActivate: [AuthGuard] },
    { path: 'consults', loadChildren: () => import('./consult/consult.module').then(m => m.ConsultModule), canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
