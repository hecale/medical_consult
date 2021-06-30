package com.hectormercado.medical.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.hectormercado.medical.entity.Doctor;
import com.hectormercado.medical.projection.IDoctorProjection;

@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface DoctorRepository  extends JpaRepository<Doctor,Long> {

	@Query(value = "SELECT * FROM doctors WHERE first_name like %?1%",
			nativeQuery = true)
	Page<IDoctorProjection> findByFirstName(String firstName, Pageable pageable);

	@Query(value = "SELECT * FROM doctors WHERE last_name like %?1%",
			nativeQuery = true)
	Page<IDoctorProjection> findByLastName(String lastName, Pageable pageable);

	@Query(value = "SELECT * FROM doctors WHERE birthday = ?1",
			nativeQuery = true)
	Page<IDoctorProjection> findByBirthday(String birthday, Pageable pageable);

	@Query(value = "SELECT * FROM doctors WHERE speciality like %?1%",
			nativeQuery = true)
	Page<IDoctorProjection> findBySpeciality(String speciality, Pageable pageable);

	@Query(value = "SELECT * FROM doctors",
			nativeQuery = true)
	Page<IDoctorProjection> findByAllDoctors(Pageable pageable);

}
