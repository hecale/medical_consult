package com.hectormercado.medical.service;

import java.util.ArrayList;

import com.hectormercado.medical.entity.Consultation;
import com.hectormercado.medical.projection.IConsultationDoctorPatientProjection;
import com.hectormercado.medical.projection.IConsultationDoctorProjection;
import com.hectormercado.medical.projection.IConsultationProjection;

public interface ConsultationService {
	
	public Consultation save(Consultation consultation);
	
	public void deleteById(Long id);
	
	public ArrayList<IConsultationProjection> findByPatientId(Long id);
	public ArrayList<IConsultationDoctorProjection> findByDoctorId(Long id);
	public ArrayList<IConsultationDoctorPatientProjection> findByDoctorPatientId(Long doctorId, Long patientId);
	
}
