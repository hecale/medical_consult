package com.hectormercado.medical.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hectormercado.medical.entity.Consultation;
import com.hectormercado.medical.projection.IConsultationDoctorPatientProjection;
import com.hectormercado.medical.projection.IConsultationDoctorProjection;
import com.hectormercado.medical.projection.IConsultationProjection;
import com.hectormercado.medical.repository.ConsultationRepository;

@Service
public class ConsultationServiceImpl implements ConsultationService{

	@Autowired
	private ConsultationRepository consultationRepository;
	
	@Override
	@Transactional
	public Consultation save(Consultation consultation) {
		return consultationRepository.save(consultation);
	}

	@Override
	@Transactional
	public void deleteById(Long id) {
		consultationRepository.deleteById(id);
	}

	@Override
	public ArrayList<IConsultationProjection> findByPatientId(Long id) {
		return consultationRepository.findByPatientId(id);
	}

	@Override
	public ArrayList<IConsultationDoctorProjection> findByDoctorId(Long id) {
		return consultationRepository.findByDoctorId(id);
	}

	@Override
	public ArrayList<IConsultationDoctorPatientProjection> findByDoctorPatientId(Long doctorId, Long patientId) {
		return consultationRepository.findByDoctorPatientId(doctorId,patientId);
	}

}
