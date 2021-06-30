import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getDoctors(pageIndex: number, pageSize: number, sortBy: String, direction: String, filterText: String, filterBy: String) {

    let myUrl = "";
    if(filterText == ""){
      myUrl = `${environment.baseurl}doctors?page=${pageIndex}&size=${pageSize}&sortBy=${sortBy}&direction=${direction}`;
    }else{
      myUrl = `${environment.baseurl}doctors?${filterBy}=${filterText}&page=${pageIndex}&size=${pageSize}&sortBy=${sortBy}&direction=${direction}`;
    }

    return this.http.get(myUrl);
  }

  addDoctor(
    firstName:string,
    lastName:string,
    birthday:string,
    address:string,
    speciality:string,
    photo:any
  ){
    const uploadData = new FormData();

    uploadData.append('doctorData',`{"firstName": "${firstName}",
    "lastName": "${lastName}",
    "birthday": "${birthday}",
    "address":  "${address}",
    "speciality":  "${speciality}"
    }`);
    uploadData.append('image', photo, 'doctor');

    console.log(uploadData.get('doctorData'));

    return this.http.post(environment.baseurl + 'doctors' , uploadData);
  }

  addDoctorWithoutPhoto(
    firstName:string,
    lastName:string,
    birthday:string,
    address:string,
    speciality:string
  ){

    const uploadData = new FormData();

    uploadData.append('doctorData',`{"firstName": "${firstName}",
    "lastName": "${lastName}",
    "birthday": "${birthday}",
    "address":  "${address}",
    "speciality":  "${speciality}"
    }`);

    console.log(uploadData.get('doctorData'));

    return this.http.post(environment.baseurl + 'doctors' , uploadData);
  }

  editDoctorWithoutPhoto(
    id:number,
    firstName:string,
    lastName:string,
    birthday:string,
    address:string,
    speciality:string
  ){

    const uploadData = new FormData();

    uploadData.append('doctorDataString',`{"firstName": "${firstName}",
    "lastName": "${lastName}",
    "birthday": "${birthday}",
    "address":  "${address}",
    "speciality":  "${speciality}"
    }`);

    console.log(uploadData.get('doctorData'));

    return this.http.put(environment.baseurl + 'doctors/' + id , uploadData);
  }

  editDoctor(
    id: number,
    firstName:string,
    lastName:string,
    birthday:string,
    address:string,
    speciality:string,
    photo:any
  ){
    const uploadData = new FormData();

    uploadData.append('doctorData',`{"firstName": "${firstName}",
    "lastName": "${lastName}",
    "birthday": "${birthday}",
    "address":  "${address}",
    "speciality":  "${speciality}"
    }`);
    uploadData.append('image', photo, 'doctor');

    console.log(uploadData.get('doctorData'));

    return this.http.put(environment.baseurl + 'doctors/' + id , uploadData);
  }

  getDoctorPatients(id: number) {

    let myUrl = `${environment.baseurl}consultations/doctor/${id}`;

    return this.http.get(myUrl);
  }

  getDoctorPatientConsults(doctorId: number, patientId: number) {

    let myUrl = `${environment.baseurl}consultations/doctor-patient/${doctorId}/${patientId}`;

    return this.http.get(myUrl);
  }

  getDoctor(id: number) {

    let myUrl = `${environment.baseurl}doctors/${id}`;

    return this.http.get(myUrl);
  }

}
