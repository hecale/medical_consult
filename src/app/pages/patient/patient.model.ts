export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  address: string;
  picture?: string;
}

export interface PatientConsult {
  id: number,
  patientId: number,
  doctorId: number,
  description: String,
  medicine: String,
  consultationDate: String,
  firstName: String,
  lastName: String,
  birthday: String,
  address: String,
  picture: String,
  speciality: String
}
