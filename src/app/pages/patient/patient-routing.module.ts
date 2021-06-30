import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientConsultsComponent } from './patient-consults/patient-consults.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component'

const routes: Routes = [
  {
    path: 'add',
    component: AddPatientComponent
  },
  {
    path: 'list',
    component: PatientsListComponent
  },
  {
    path: 'consults/:id',
    component: PatientConsultsComponent
  },
  {
    path: 'edit/:id',
    component: EditPatientComponent
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientRoutingModule { }
