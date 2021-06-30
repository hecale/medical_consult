package com.hectormercado.medical.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hectormercado.medical.entity.Patient;
import com.hectormercado.medical.projection.IPatientProjection;

public interface PatientService {

	public Iterable<Patient> findAll();
	
	public Page<Patient> findAll(Pageable pageable);
	
	public Optional<Patient> findById(Long Id);
	
	public Patient save(Patient user);
	
	public void deleteById(Long id);
	
	public Page<IPatientProjection> findByFirstName(String firstName, Pageable pageable);
	
	public Page<IPatientProjection> findByLastName(String lastName, Pageable pageable);
	
	public Page<IPatientProjection> findByBirthday(String birthday, Pageable pageable);
	
	public Page<IPatientProjection> findByAddress(String address, Pageable pageable);
	
	public Page<IPatientProjection> findAllPatients(Pageable pageable);
}
