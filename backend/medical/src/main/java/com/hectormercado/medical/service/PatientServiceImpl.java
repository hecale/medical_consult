package com.hectormercado.medical.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hectormercado.medical.entity.Patient;
import com.hectormercado.medical.projection.IPatientProjection;
import com.hectormercado.medical.repository.PatientRepository;

@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	private PatientRepository patientRepository;
	
	@Override
	@Transactional(readOnly = true)
	public Iterable<Patient> findAll() {
		return patientRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Patient> findAll(Pageable pageable) {
		return patientRepository.findAll(pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Patient> findById(Long id) {
		return patientRepository.findById(id);
	}

	@Override
	@Transactional
	public Patient save(Patient patient) {
		return patientRepository.save(patient);
	}

	@Override
	@Transactional
	public void deleteById(Long id) {
		patientRepository.deleteById(id);
	}

	@Override
	public Page<IPatientProjection> findByFirstName(String firstName, Pageable pageable) {
		return patientRepository.findByFirstName(firstName, pageable);
	}

	@Override
	public Page<IPatientProjection> findByLastName(String lastName, Pageable pageable) {
		return patientRepository.findByLastName(lastName, pageable);
	}

	@Override
	public Page<IPatientProjection> findByBirthday(String birthday, Pageable pageable) {
		return patientRepository.findByBirthday(birthday, pageable);
	}

	@Override
	public Page<IPatientProjection> findByAddress(String address, Pageable pageable) {
		return patientRepository.findByAddress(address, pageable);
	}

	@Override
	public Page<IPatientProjection> findAllPatients(Pageable pageable) {
		return patientRepository.findAllPatients(pageable);
	}

	

	






}
