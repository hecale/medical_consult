package com.hectormercado.medical.projection;

import org.springframework.beans.factory.annotation.Value;

public interface IAllConsultationsProjection {

	
	Long getId();
	
	String getDescription();
	
	String getMedicine();
	
	String getConsultationDate();

	String getFirstNameD();
	
	String getLastNameD();

	String getFirstNameP();
	
	String getLastNameP();
}
