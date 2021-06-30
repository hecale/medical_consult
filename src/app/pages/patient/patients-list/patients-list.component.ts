import { AfterViewInit, Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PatientService } from '../patient.service';
import { Patient } from '../patient.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cf-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
  providers: [PatientService]
})
export class PatientsListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false} ) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @HostListener('matSortChange', ['$event'])

  displayedColumns = ['id','firstName', 'lastName', 'birthday', 'address', 'picture', 'customColumn1'];
  searchOpt = {
    patientsLenght: 0,
    patientsItems: 25,
    patientsPage: 0,
    patientsSortBy: 'id',
    patientsDirection: 'asc',
    PatientSearchText: '',
    PatientSearchBy: ''
  }

  loading: boolean = false;
  error: boolean = false;
  filtering: boolean = false;
  ELEMENT_DATA: Patient[];
  patientForm: FormGroup;
  dataSource = new MatTableDataSource<Patient>(this.ELEMENT_DATA);

  constructor(private service: PatientService,
    public formBuilder: FormBuilder){}

  ngOnInit() {
    this.getPatients(true, this.searchOpt.patientsPage, this.searchOpt.patientsItems, this.searchOpt.patientsSortBy,
      this.searchOpt.patientsDirection, this.searchOpt.PatientSearchText, this.searchOpt.PatientSearchBy);

    this.patientForm = this.formBuilder.group({
      searchText: ['', [Validators.required, Validators.min(2), Validators.max(255), Validators.pattern('[a-zA-Z0-9 ]+')]],
      searchBy: ['firstName', []],
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getPatients(initialState: boolean, pageIndex: number, pageSize: number,
    sortBy:String, direction: String, filterText: String, filterBy: String){
    initialState ? this.loading = true: this.filtering = true;
    this.service.getPatients(pageIndex, pageSize, sortBy,
      direction, filterText, filterBy)
    .subscribe(
      (res) =>{
        this.dataSource.data = res['content'] as Patient[];
        this.searchOpt.patientsLenght = res['totalElements'];
        initialState ? this.loading = false: this.filtering = false;
      },
      (err) => {
        this.error = true;
        initialState ? this.loading = false: this.filtering = false;
      }
    )
  }

  public pageChangeEvent({pageIndex, pageSize}){
    this.searchOpt.patientsItems = pageSize;
    this.searchOpt.patientsPage = pageIndex;
    this.getPatients(false,pageIndex, pageSize, this.searchOpt.patientsSortBy,
      this.searchOpt.patientsDirection, this.searchOpt.PatientSearchText, this.searchOpt.PatientSearchBy);
  }

  sortChange(args) {
    this.searchOpt.patientsSortBy = String(this.nameTransform(args['active']));
    this.searchOpt.patientsDirection = args['direction'];

    this.getPatients(false, this.searchOpt.patientsPage, this.searchOpt.patientsItems, this.searchOpt.patientsSortBy,
      this.searchOpt.patientsDirection, this.searchOpt.PatientSearchText, this.searchOpt.PatientSearchBy);
  }

  public nameTransform(name: String){
    switch(name) {
      case "firstName":
        return 'first_name';
      case 'lastName':
        return 'last_name';
      default:
        return name;
    }
  }

  get form() {
    return this.patientForm.controls;
  }

  public filterSearch() {
    if(this.patientForm.controls.searchText.errors == null){
      this.searchOpt.PatientSearchText = this.patientForm.value.searchText;
      this.searchOpt.PatientSearchBy = this.patientForm.value.searchBy;

      this.getPatients(false, this.searchOpt.patientsPage, this.searchOpt.patientsItems, this.searchOpt.patientsSortBy,
        this.searchOpt.patientsDirection, this.searchOpt.PatientSearchText, this.searchOpt.PatientSearchBy);

    }else{

    }
  }


}
