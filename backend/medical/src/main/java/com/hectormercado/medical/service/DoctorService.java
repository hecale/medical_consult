package com.hectormercado.medical.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hectormercado.medical.entity.Doctor;
import com.hectormercado.medical.projection.IDoctorProjection;

public interface DoctorService {
	public Iterable<Doctor> findAll();
	
	public Page<Doctor> findAll(Pageable pageable);
	
	public Optional<Doctor> findById(Long Id);
	
	public Doctor save(Doctor doctor);
	
	public void deleteById(Long id);
	
	public Page<IDoctorProjection> findByFirstName(String firstName, Pageable pageable);
	
	public Page<IDoctorProjection> findByLastName(String lastName, Pageable pageable);
	
	public Page<IDoctorProjection> findByBirthday(String birthday, Pageable pageable);
	
	public Page<IDoctorProjection> findBySpeciality(String speciality, Pageable pageable);
	
	public Page<IDoctorProjection> findByAllDoctors(Pageable pageable);
}
