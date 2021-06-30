import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  constructor(private http: HttpClient) { }

  getDoctors() {

    let myUrl = `${environment.baseurl}doctors?page=0&size=1000`;

    return this.http.get(myUrl);
  }

  getPatients() {

    let myUrl = `${environment.baseurl}patients?page=0&size=1000`;

    return this.http.get(myUrl);
  }

  addConsult(
    doctorId:number,
    patientId:number,
    description:string,
    medicine:string
  ){

    let consult = {
      doctor:{
        id: doctorId
      },
      patient:{
        id: patientId
      },
      description: description,
      medicine: medicine
    };

    return this.http.post(environment.baseurl + 'consultations' , consult);
  }


}
