package com.hectormercado.medical.entity;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="consultations")
public class Consultation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "description", length = 255, nullable = false)
	private String description;
	
	@Column(name = "consultation_date", nullable = false)
	@Temporal(TemporalType.DATE)
	private Calendar consultationDate;
	
	@Column(name = "medicine",length = 1000, nullable = false)
	private String medicine;
	
	@ManyToOne()
	@JoinColumn(name="doctor_id")
    private Doctor doctor;
	
	@ManyToOne()
	@JoinColumn(name="patient_id")
    private Patient patient;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Calendar getConsultationDate() {
		return consultationDate;
	}

	public void setConsultationDate(Calendar consultationDate) {
		this.consultationDate = consultationDate;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public String getMedicine() {
		return medicine;
	}

	public void setMedicine(String medicine) {
		this.medicine = medicine;
	}

}
