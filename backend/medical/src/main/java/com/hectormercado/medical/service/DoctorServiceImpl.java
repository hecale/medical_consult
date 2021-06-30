package com.hectormercado.medical.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hectormercado.medical.entity.Doctor;
import com.hectormercado.medical.projection.IDoctorProjection;
import com.hectormercado.medical.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService{

	@Autowired
	private DoctorRepository doctorRepository;
	
	@Override
	@Transactional(readOnly = true)
	public Iterable<Doctor> findAll() {
		return doctorRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Doctor> findAll(Pageable pageable) {
		return doctorRepository.findAll(pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Doctor> findById(Long id) {
		return doctorRepository.findById(id);
	}

	@Override
	@Transactional
	public Doctor save(Doctor doctor) {
		return doctorRepository.save(doctor);
	}

	@Override
	@Transactional
	public void deleteById(Long id) {
		doctorRepository.deleteById(id);
	}

	@Override
	public Page<IDoctorProjection> findByFirstName(String firstName, Pageable pageable) {
		return doctorRepository.findByFirstName(firstName, pageable);
	}

	@Override
	public Page<IDoctorProjection> findByLastName(String lastName, Pageable pageable) {
		return doctorRepository.findByLastName(lastName, pageable);
	}

	@Override
	public Page<IDoctorProjection> findByBirthday(String birthday, Pageable pageable) {
		return doctorRepository.findByBirthday(birthday, pageable);
	}

	@Override
	public Page<IDoctorProjection> findBySpeciality(String speciality, Pageable pageable) {
		return doctorRepository.findBySpeciality(speciality, pageable);
	}

	@Override
	public Page<IDoctorProjection> findByAllDoctors(Pageable pageable) {
		return doctorRepository.findByAllDoctors(pageable);
	}

	
}
