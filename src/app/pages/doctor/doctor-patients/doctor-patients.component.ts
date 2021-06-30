import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from '../doctor.service';
import { DoctorPatients } from '../doctor.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cf-doctor-patients',
  templateUrl: './doctor-patients.component.html',
  styleUrls: ['./doctor-patients.component.scss'],
  providers: [DoctorService]
})
export class DoctorPatientsComponent implements OnInit {

  displayedColumns = ['patientId', 'doctorId', 'firstName', 'lastName', 'birthday', 'address', 'picture', 'customColumn1'];

  id: number;
  loading: boolean = false;
  error: boolean = false;
  ELEMENT_DATA: DoctorPatients[];
  dataSource = new MatTableDataSource<DoctorPatients>(this.ELEMENT_DATA);

  constructor(private service: DoctorService,
    private route: ActivatedRoute){
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
    }

  ngOnInit() {
    this.getDoctorPatients();

  }

  ngAfterViewInit() {
  }

  public getDoctorPatients(){
    this.loading = true;
    this.service.getDoctorPatients(this.id)
    .subscribe(
      (res) =>{
        console.log(res);
        this.dataSource.data = res as DoctorPatients[];
        this.loading = false;
      },
      (err) => {
        this.error = true;
        this.loading = false;
      }
    )
  }

}
