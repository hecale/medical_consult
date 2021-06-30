import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getPatients(pageIndex: number, pageSize: number, sortBy: String, direction: String, filterText: String, filterBy: String) {

    let myUrl = "";
    if(filterText == ""){
      myUrl = `${environment.baseurl}patients?page=${pageIndex}&size=${pageSize}&sortBy=${sortBy}&direction=${direction}`;
    }else{
      myUrl = `${environment.baseurl}patients?${filterBy}=${filterText}&page=${pageIndex}&size=${pageSize}&sortBy=${sortBy}&direction=${direction}`;
    }

    return this.http.get(myUrl);
  }

  addPatient(
    firstName:string,
    lastName:string,
    birthday:string,
    address:string,
    photo:any
  ){
    const uploadData = new FormData();

    uploadData.append('patientData',`{"firstName": "${firstName}",
    "lastName": "${lastName}",
    "birthday": "${birthday}",
    "address":  "${address}"
    }`);
    uploadData.append('image', photo, 'patient');

    return this.http.post(environment.baseurl + 'patients' , uploadData);
  }

  addPatientWithoutPhoto(
    firstName:string,
    lastName:string,
    birthday:string,
    address:string
  ){

    const uploadData = new FormData();

    uploadData.append('patientData',`{"firstName": "${firstName}",
    "lastName": "${lastName}",
    "birthday": "${birthday}",
    "address":  "${address}"
    }`);


    return this.http.post(environment.baseurl + 'patients' , uploadData);
  }

  editPatient(
    id: number,
    firstName:string,
    lastName:string,
    birthday:string,
    address:string,
    photo:any
  ){
    const uploadData = new FormData();

    uploadData.append('patientDataString',`{"firstName": "${firstName}",
    "lastName": "${lastName}",
    "birthday": "${birthday}",
    "address":  "${address}"
    }`);
    uploadData.append('image', photo, 'patient');

    return this.http.put(environment.baseurl + 'patients/' + id , uploadData);
  }

  editPatientWithoutPhoto(
    id: number,
    firstName:string,
    lastName:string,
    birthday:string,
    address:string
  ){

    const uploadData = new FormData();

    uploadData.append('patientDataString',`{"firstName": "${firstName}",
    "lastName": "${lastName}",
    "birthday": "${birthday}",
    "address":  "${address}"
    }`);


    return this.http.put(environment.baseurl + 'patients/' + id , uploadData);
  }

  getPatientConsults(id: number) {

    let myUrl = `${environment.baseurl}consultations/patient/${id}`;

    return this.http.get(myUrl);
  }

  getPatient(id: number) {

    let myUrl = `${environment.baseurl}consultations/${id}`;

    return this.http.get(myUrl);
  }

}
