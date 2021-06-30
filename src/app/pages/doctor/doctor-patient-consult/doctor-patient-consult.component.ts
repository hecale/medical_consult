import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from '../doctor.service';
import { DoctorPatientConsult } from '../doctor.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cf-doctor-patient-consult',
  templateUrl: './doctor-patient-consult.component.html',
  styleUrls: ['./doctor-patient-consult.component.scss'],
  providers: [DoctorService]
})
export class DoctorPatientConsultComponent implements OnInit {

  displayedColumns = ['id', 'description', 'medicine', 'consultationDate'];

  doctorId: number;
  patientId: number;
  loading: boolean = false;
  error: boolean = false;
  ELEMENT_DATA: DoctorPatientConsult[];
  dataSource = new MatTableDataSource<DoctorPatientConsult>(this.ELEMENT_DATA);

  constructor(private service: DoctorService,
    private route: ActivatedRoute){
      this.route.params.subscribe(params => {
        this.doctorId = params['doctorId'];
        this.patientId = params['patientId'];
      });
    }

  ngOnInit() {
    this.getDoctorPatientConsults();

  }

  ngAfterViewInit() {
  }

  public getDoctorPatientConsults(){
    this.loading = true;
    this.service.getDoctorPatientConsults(this.doctorId, this.patientId)
    .subscribe(
      (res) =>{
        console.log(res);
        this.dataSource.data = res as DoctorPatientConsult[];
        this.loading = false;
      },
      (err) => {
        this.error = true;
        this.loading = false;
      }
    )
  }

}
