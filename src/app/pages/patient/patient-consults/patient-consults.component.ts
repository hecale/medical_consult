import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from '../patient.service';
import { PatientConsult } from '../patient.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cf-patient-consults',
  templateUrl: './patient-consults.component.html',
  styleUrls: ['./patient-consults.component.scss'],
  providers: [PatientService]
})
export class PatientConsultsComponent implements AfterViewInit, OnInit {
  displayedColumns = ['id', 'patientId', 'doctorId', 'description', 'medicine', 'consultationDate', 'firstName', 'lastName', 'birthday', 'address', 'picture', 'speciality'];

  id: number;
  loading: boolean = false;
  error: boolean = false;
  ELEMENT_DATA: PatientConsult[];
  dataSource = new MatTableDataSource<PatientConsult>(this.ELEMENT_DATA);

  constructor(private service: PatientService,
    private route: ActivatedRoute){
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
    }

  ngOnInit() {
    this.getPatients();

  }

  ngAfterViewInit() {
  }

  public getPatients(){
    this.loading = true;
    this.service.getPatientConsults(this.id)
    .subscribe(
      (res) =>{
        console.log(res);
        this.dataSource.data = res as PatientConsult[];
        this.loading = false;
      },
      (err) => {
        this.error = true;
        this.loading = false;
      }
    )
  }


}
