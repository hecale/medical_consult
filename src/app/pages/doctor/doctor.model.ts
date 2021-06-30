export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  speciality: string;
  birthday: string;
  address: string;
  picture?: string;
}

export interface DoctorPatients {
  patientId: number,
  doctorId: number,
  firstName: String,
  lastName: String,
  birthday: String,
  address: String,
  picture: string
}

export interface DoctorPatientConsult {
  id: number,
  description: String,
  medicine: String,
  consultationDate: String
}
