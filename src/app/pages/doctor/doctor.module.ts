import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { DoctorRoutingModule } from './doctor-routing.module';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule,MatTableModule, MatCardModule } from '@angular/material';

import { MatSelectModule } from '@angular/material/select';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component'
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { DoctorPatientsComponent } from './doctor-patients/doctor-patients.component';
import { DoctorPatientConsultComponent } from './doctor-patient-consult/doctor-patient-consult.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';


@NgModule({
  declarations: [DoctorsListComponent, AddDoctorComponent, DoctorPatientsComponent, DoctorPatientConsultComponent, EditDoctorComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class DoctorModule { }
