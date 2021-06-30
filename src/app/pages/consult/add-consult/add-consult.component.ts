import { Component, OnInit, Injectable } from '@angular/core';
import { ConsultService } from '../consult.service';
import { Doctor } from '../../doctor/doctor.model';
import { Patient } from '../../patient/patient.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'cf-add-consult',
  templateUrl: './add-consult.component.html',
  styleUrls: ['./add-consult.component.scss'],
  providers: [ConsultService]
})
export class AddConsultComponent implements OnInit {

  consultForm: FormGroup;
  loading = false;
  patients: Patient;
  doctors: Doctor;

  selectedPhoto: File;


  constructor(public formBuilder: FormBuilder,
    private router: Router,
    public service:ConsultService) { }

  ngOnInit() {

    this.loading=true;
    this.service.getPatients().subscribe(
      (res) => {
        this.patients = res['content'];

        this.service.getDoctors().subscribe(
          (res) => {
            this.doctors = res['content'];

            this.consultForm = this.formBuilder.group({
              doctorId: ['', [Validators.required]],
              patientId: ['', [Validators.required]],
              medicine: ['', [Validators.max(100), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
              description: ['', [Validators.required, Validators.min(2), Validators.max(255), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
            });

            console.log('doctors');
            console.log(this.doctors);
            this.loading=false;

          },
          (err) => {
          }
        )
      },
      (err) => {
      }
    )
  }

  get form() {
    return this.consultForm.controls;
  }

  addConsult(){
    if(this.consultForm.controls.medicine.errors == null
      && this.consultForm.controls.description.errors == null){
        this.loading = true;

        this.service.addConsult(
          this.consultForm.value.doctorId,
          this.consultForm.value.patientId,
          this.consultForm.value.medicine,
          this.consultForm.value.description
          ).subscribe(
            (res) => {
              this.loading = false;
              this.router.navigate(['./doctors/list']);
            },
            (err) => {
              this.loading = false;
            }
          )
    }
  }


}
