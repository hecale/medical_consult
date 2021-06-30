import { Component, OnInit, Injectable } from '@angular/core';
import { PatientService } from '../patient.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cf-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss'],
  providers: [PatientService]
})
export class EditPatientComponent implements OnInit {

  patientForm: FormGroup;
  loading = false;
  id: number;

  selectedPhoto: File;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    public service:PatientService,
    private route: ActivatedRoute){
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
    }

  ngOnInit() {
    this.loading = true;
    this.service.getPatient(this.id)
    .subscribe(
      (res) =>{

        const patientData = res;
        console.log(res);
        this.patientForm = this.formBuilder.group({
          firstName: [patientData['firstName'], [Validators.required, Validators.min(2), Validators.max(60), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
          lastName: [patientData['lastName'], [Validators.required, Validators.min(2), Validators.max(60), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
          birthday: [patientData['birthday'], [Validators.required]],
          address: [patientData['address'], [Validators.required, Validators.min(2), Validators.max(60), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
        });

        this.imgURL = patientData['picture'];

        this.loading = false;
      },
      (err) =>{
        this.loading = false;
      }
    );

  }

  get form() {
    return this.patientForm.controls;
  }

  editPatient(){
    if(
      this.patientForm.controls.firstName.errors == null
      && this.patientForm.controls.lastName.errors == null
      && this.patientForm.controls.birthday.errors == null
      && this.patientForm.controls.address.errors == null){
        this.loading = true;
        if(this.selectedPhoto != undefined){
          this.service.editPatient(
            this.id,
            this.patientForm.value.firstName,
            this.patientForm.value.lastName,
            this.patientForm.value.birthday,
            this.patientForm.value.address,
            this.selectedPhoto
            ).subscribe(
              (res) => {
                this.loading = false;
                this.router.navigate(['../list']);
              },
              (err) => {
                this.loading = false;
              }
            )
        }else{
          this.service.editPatientWithoutPhoto(
            this.id,
            this.patientForm.value.firstName,
            this.patientForm.value.lastName,
            this.patientForm.value.birthday,
            this.patientForm.value.address
            ).subscribe(
              (res) => {
                this.loading = false;
                this.router.navigate(['../list']);
              },
              (err) => {
                this.loading = false;
              }
            )
        }

    }
  }

  onAddPhoto(event) {
    this.selectedPhoto = event.target.files[0];
    console.log(this.selectedPhoto);
  }

  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {

    if (files.length === 0){
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

    this.selectedPhoto = files[0];
  }

}
