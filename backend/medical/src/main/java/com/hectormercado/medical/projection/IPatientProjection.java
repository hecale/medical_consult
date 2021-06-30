package com.hectormercado.medical.projection;

import org.springframework.beans.factory.annotation.Value;

public interface IPatientProjection {
	int getId();
	
	@Value("#{target.first_name}")
	String getFirstName();
	
	@Value("#{target.last_name}")
	String getLastName();
	
	String getBirthday();
	
	String getAddress();
	
	String getPicture();
	
}