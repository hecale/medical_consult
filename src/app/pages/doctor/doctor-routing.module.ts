import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DoctorPatientsComponent } from './doctor-patients/doctor-patients.component';
import { DoctorPatientConsultComponent } from './doctor-patient-consult/doctor-patient-consult.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';


const routes: Routes = [

  {
    path: 'list',
    component: DoctorsListComponent
  },
  {
    path: 'add',
    component: AddDoctorComponent
  },
  {
    path: 'patients/:id',
    component: DoctorPatientsComponent
  },
  {
    path: 'doctor_patient_consults/:doctorId/:patientId',
    component: DoctorPatientConsultComponent
  },
  {
    path: 'edit/:id',
    component: EditDoctorComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorRoutingModule { }
