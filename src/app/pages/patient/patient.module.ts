import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PatientRoutingModule } from './patient-routing.module';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule,MatTableModule, MatCardModule } from '@angular/material';
import { DataTableComponent } from './data-table/data-table.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { PatientConsultsComponent } from './patient-consults/patient-consults.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';

@NgModule({
  declarations: [AddPatientComponent, DataTableComponent, PatientsListComponent, PatientConsultsComponent, EditPatientComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
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
export class PatientModule { }
