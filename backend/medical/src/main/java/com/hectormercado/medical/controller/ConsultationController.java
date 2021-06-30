package com.hectormercado.medical.controller;

import java.util.ArrayList;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hectormercado.medical.response.ResponseHandler;
import com.hectormercado.medical.entity.Consultation;
import com.hectormercado.medical.projection.IConsultationDoctorPatientProjection;
import com.hectormercado.medical.projection.IConsultationDoctorProjection;
import com.hectormercado.medical.projection.IConsultationProjection;
import com.hectormercado.medical.service.ConsultationService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/consultations")
public class ConsultationController {

	@Autowired
	private ConsultationService consultationService;
	
	@PostMapping()
	public ResponseEntity createConsultation(@RequestBody Consultation consultation) {
		
			consultation.setConsultationDate(Calendar.getInstance());
			consultationService.save(consultation);
			
			return ResponseHandler.generateResponse("Consultation created", HttpStatus.CREATED);

	}
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@GetMapping("/patient/{id}")
	public ArrayList<IConsultationProjection> findByPatientId(@PathVariable(value = "id") Long id) {
		
		return consultationService.findByPatientId(id);
	}
	
	@GetMapping("/doctor/{id}")
	public ArrayList<IConsultationDoctorProjection> findByDoctorId(@PathVariable(value = "id") Long id) {
		
		return consultationService.findByDoctorId(id);
	}
	
	@GetMapping("/doctor-patient/{doctorId}/{patientId}")
	public ArrayList<IConsultationDoctorPatientProjection> findByDoctorPatientId(@PathVariable(value = "doctorId") Long doctorId,
			@PathVariable(value = "patientId") Long patientId) {
		
		return consultationService.findByDoctorPatientId(doctorId, patientId);
	}
	
	
}
