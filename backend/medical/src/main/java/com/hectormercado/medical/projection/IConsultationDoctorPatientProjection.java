package com.hectormercado.medical.projection;

import org.springframework.beans.factory.annotation.Value;

public interface IConsultationDoctorPatientProjection {
	@Value("#{target.id}")
	Long getId();
	
	String getDescription();
	
	String getMedicine();
	
	@Value("#{target.consultation_date}")
	String getConsultationDate();
}
