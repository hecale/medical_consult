import { Component, OnInit, Injectable } from '@angular/core';
import { DoctorService } from '../doctor.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'cf-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
  providers: [DoctorService]
})
export class AddDoctorComponent implements OnInit {

  doctorForm: FormGroup;
  loading = false;

  selectedPhoto: File;


  constructor(public formBuilder: FormBuilder,
    private router: Router,
    public service:DoctorService) { }

  ngOnInit() {
    this.doctorForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.min(2), Validators.max(60), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
      lastName: ['', [Validators.required, Validators.min(2), Validators.max(60), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
      birthday: ['', [Validators.required]],
      address: ['', [Validators.max(60), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
      speciality: ['', [Validators.required, Validators.min(2), Validators.max(60), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
    });
  }

  get form() {
    return this.doctorForm.controls;
  }

  addDoctor(){
    if(
      this.doctorForm.controls.firstName.errors == null
      && this.doctorForm.controls.lastName.errors == null
      && this.doctorForm.controls.birthday.errors == null
      && this.doctorForm.controls.speciality.errors == null){
        this.loading = true;
        if(this.selectedPhoto != undefined){
          this.service.addDoctor(
            this.doctorForm.value.firstName,
            this.doctorForm.value.lastName,
            this.doctorForm.value.birthday,
            this.doctorForm.value.address,
            this.doctorForm.value.speciality,
            this.selectedPhoto
            ).subscribe(
              (res) => {
                this.loading = false;
                this.router.navigate(['./doctors/list']);
              },
              (err) => {
                this.loading = false;
              }
            )
        }else{
          this.service.addDoctorWithoutPhoto(
            this.doctorForm.value.firstName,
            this.doctorForm.value.lastName,
            this.doctorForm.value.birthday,
            this.doctorForm.value.address,
            this.doctorForm.value.speciality,
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
