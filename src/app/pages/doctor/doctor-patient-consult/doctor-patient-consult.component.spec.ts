import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientConsultComponent } from './doctor-patient-consult.component';

describe('DoctorPatientConsultComponent', () => {
  let component: DoctorPatientConsultComponent;
  let fixture: ComponentFixture<DoctorPatientConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorPatientConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPatientConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
