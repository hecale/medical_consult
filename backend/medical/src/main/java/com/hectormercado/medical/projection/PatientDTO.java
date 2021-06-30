package com.hectormercado.medical.projection;

public class PatientDTO {
	int id;
	String birthday;
	String address;
	String picture;
	
	public PatientDTO(int id, String firstName, String lastName, String birthday, String address, String picture) {
		this.id = id;
		this.birthday = birthday;
		this.address = address;
		this.picture = picture;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	
}
