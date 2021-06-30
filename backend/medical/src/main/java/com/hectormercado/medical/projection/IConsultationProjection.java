package com.hectormercado.medical.projection;

import org.springframework.beans.factory.annotation.Value;

public interface IConsultationProjection {
	@Value("#{target.id}")
	Long getId();
	
	@Value("#{target.patient_id}")
	Long getPatientId();
	
	@Value("#{target.doctor_id}")
	Long getDoctorId();
	
	String getDescription();
	
	String getMedicine();
	
	@Value("#{target.consultation_date}")
	String getConsultationDate();

	@Value("#{target.first_name}")
	String getFirstName();
	
	@Value("#{target.last_name}")
	String getLastName();
	
	@Value("#{target.birthday}")
	String getBirthday();
	
	@Value("#{target.address}")
	String getAddress();
	
	@Value("#{target.picture}")
	String getPicture();
	
	@Value("#{target.speciality}")
	String getSpeciality();
	
}
