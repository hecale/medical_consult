package com.hectormercado.medical.repository;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.hectormercado.medical.entity.Consultation;
import com.hectormercado.medical.projection.IConsultationDoctorPatientProjection;
import com.hectormercado.medical.projection.IConsultationDoctorProjection;
import com.hectormercado.medical.projection.IConsultationProjection;

@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface ConsultationRepository extends JpaRepository<Consultation,Long>  {

	@Query(value = "SELECT c.id,c.patient_id,c.doctor_id,c.description,c.medicine,c.consultation_date,d.first_name,d.last_name,d.birthday,d.address,d.picture,d.speciality FROM consultations c INNER JOIN doctors d ON c.doctor_id = d.id WHERE c.patient_id = ?1 ORDER BY c.consultation_date DESC",
			nativeQuery = true)
	ArrayList<IConsultationProjection> findByPatientId(Long id);

	@Query(value = "SELECT c.patient_id,c.doctor_id,c.description,p.first_name,p.last_name,p.birthday,p.address,p.picture FROM consultations c INNER JOIN patients p ON c.patient_id = p.id WHERE c.doctor_id = ?1 GROUP BY c.patient_id",
			nativeQuery = true)
	ArrayList<IConsultationDoctorProjection> findByDoctorId(Long id);

	@Query(value = "SELECT c.id,c.medicine,c.description,c.consultation_date FROM consultations c WHERE c.doctor_id = ?1 AND c.patient_id = ?2 ORDER BY c.consultation_date DESC",
			nativeQuery = true)
	ArrayList<IConsultationDoctorPatientProjection> findByDoctorPatientId(Long doctorId, Long patientId);

}
