import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardComponent } from './home/dashboard/dashboard.component';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { ConsultModule } from './consult/consult.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    PatientModule,
    DoctorModule,
    ConsultModule
  ],
  providers: [

  ]
})
export class PagesModule { }
