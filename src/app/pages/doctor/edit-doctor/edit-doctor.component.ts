import { Component, OnInit, Injectable } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../doctor.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cf-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss'],
  providers: [DoctorService]
})
export class EditDoctorComponent implements OnInit {

  doctorForm: FormGroup;
  loading = false;

  selectedPhoto: File;
  id: number;


  constructor(public formBuilder: FormBuilder,
    private router: Router,
    public service:DoctorService,
    private route: ActivatedRoute){
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
    }

  ngOnInit() {
    this.loading = true;

    this.service.getDoctor(this.id)
    .subscribe(
      (res) =>{

        const doctorData = res;
        let newDate = new Date(doctorData['birthday']);


        this.doctorForm = this.formBuilder.group({
          firstName: [doctorData['firstName'], [Validators.required, Validators.min(2), Validators.max(60), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
          lastName: [doctorData['lastName'], [Validators.required, Validators.min(2), Validators.max(60), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
          birthday: [newDate, [Validators.required]],
          address: [doctorData['address'], [Validators.max(60), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
          speciality: [doctorData['speciality'], [Validators.required, Validators.min(2), Validators.max(60), Validators.pattern('[a-zA-Z0-9- ñÑáéíóúÁÉÍÓÚ\s]+')]],
        });


        this.imgURL = doctorData['picture'];

        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    )

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
          this.service.editDoctor(
            this.id,
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
          this.service.editDoctorWithoutPhoto(
            this.id,
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
