package com.hectormercado.medical.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.hectormercado.medical.entity.Patient;
import com.hectormercado.medical.projection.IPatientProjection;

@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface PatientRepository  extends JpaRepository<Patient,Long>  {

	@Query(value = "SELECT * FROM patients WHERE first_name like %?1%",
			nativeQuery = true)
	Page<IPatientProjection> findByFirstName(String firstName, Pageable pageable);

	@Query(value = "SELECT * FROM patients WHERE last_name like %?1%",
			nativeQuery = true)
	Page<IPatientProjection> findByLastName(String lastName, Pageable pageable);

	@Query(value = "SELECT * FROM patients WHERE birthday = ?1",
			nativeQuery = true)
	Page<IPatientProjection> findByBirthday(String birthday, Pageable pageable);

	@Query(value = "SELECT * FROM patients WHERE address like %?1%",
			nativeQuery = true)
	Page<IPatientProjection> findByAddress(String address, Pageable pageable);

	@Query(value = "SELECT * FROM patients WHERE 1 = 1",
			nativeQuery = true)
	Page<IPatientProjection> findAllPatients(Pageable pageable);

}
