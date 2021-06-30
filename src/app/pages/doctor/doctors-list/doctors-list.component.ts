import { AfterViewInit, Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../doctor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cf-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss'],
  providers:[DoctorService]
})
export class DoctorsListComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator, {static: false} ) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @HostListener('matSortChange', ['$event'])

  displayedColumns = ['id','firstName', 'lastName', 'speciality', 'birthday', 'address', 'picture', 'customColumn1'];
  searchOpt = {
    doctorsLenght: 0,
    doctorsItems: 25,
    doctorsPage: 0,
    doctorsSortBy: 'id',
    doctorsDirection: 'asc',
    doctorsSearchText: '',
    doctorsSearchBy: ''
  }

  loading: boolean = false;
  error: boolean = false;
  filtering: boolean = false;
  ELEMENT_DATA: Doctor[];
  patientForm: FormGroup;
  dataSource = new MatTableDataSource<Doctor>(this.ELEMENT_DATA);

  constructor(private service: DoctorService,
    public formBuilder: FormBuilder){}

  ngOnInit() {
    this.getDoctors(true, this.searchOpt.doctorsPage, this.searchOpt.doctorsItems, this.searchOpt.doctorsSortBy,
      this.searchOpt.doctorsDirection, this.searchOpt.doctorsSearchText, this.searchOpt.doctorsSearchBy);

    this.patientForm = this.formBuilder.group({
      searchText: ['', [Validators.required, Validators.min(2), Validators.max(255), Validators.pattern('[a-zA-Z0-9 ]+')]],
      searchBy: ['firstName', []],
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getDoctors(initialState: boolean, pageIndex: number, pageSize: number,
    sortBy:String, direction: String, filterText: String, filterBy: String){
    initialState ? this.loading = true: this.filtering = true;
    this.service.getDoctors(pageIndex, pageSize, sortBy,
      direction, filterText, filterBy)
    .subscribe(
      (res) =>{
        this.dataSource.data = res['content'] as Doctor[];
        this.searchOpt.doctorsLenght = res['totalElements'];
        initialState ? this.loading = false: this.filtering = false;
      },
      (err) => {
        this.error = true;
        initialState ? this.loading = false: this.filtering = false;
      }
    )
  }

  public pageChangeEvent({pageIndex, pageSize}){
    this.searchOpt.doctorsItems = pageSize;
    this.searchOpt.doctorsPage = pageIndex;
    this.getDoctors(false,pageIndex, pageSize, this.searchOpt.doctorsSortBy,
      this.searchOpt.doctorsDirection, this.searchOpt.doctorsSearchText, this.searchOpt.doctorsSearchBy);
  }

  sortChange(args) {
    this.searchOpt.doctorsSortBy = String(this.nameTransform(args['active']));
    this.searchOpt.doctorsDirection = args['direction'];

    this.getDoctors(false, this.searchOpt.doctorsPage, this.searchOpt.doctorsItems, this.searchOpt.doctorsSortBy,
      this.searchOpt.doctorsDirection, this.searchOpt.doctorsSearchText, this.searchOpt.doctorsSearchBy);
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
      this.searchOpt.doctorsSearchText = this.patientForm.value.searchText;
      this.searchOpt.doctorsSearchBy = this.patientForm.value.searchBy;

      this.getDoctors(false, this.searchOpt.doctorsPage, this.searchOpt.doctorsItems, this.searchOpt.doctorsSortBy,
        this.searchOpt.doctorsDirection, this.searchOpt.doctorsSearchText, this.searchOpt.doctorsSearchBy);

    }else{

    }
  }


}
