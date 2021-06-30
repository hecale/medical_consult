package com.hectormercado.medical.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.io.*;
import java.nio.file.*;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.hectormercado.medical.response.ResponseHandler;
import com.hectormercado.medical.entity.Patient;
import com.hectormercado.medical.projection.IPatientProjection;
import com.hectormercado.medical.service.PatientService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/patients")
public class PatientController {
	
	@Autowired
	private PatientService patientService;

	@PostMapping()
	public ResponseEntity uploadToLocalFileSystem(String patientData,
			@RequestParam(name = "image", required = false) MultipartFile multipartFile
			) throws IOException {
		
		try {
			Patient patient = stringToObject(patientData);
			patient = addDate(patient);
			
			if (multipartFile != null) {
				String fileType = multipartFile.getContentType();

				if(fileType.equals("image/jpeg") || fileType.equals("image/png")) {
					
					patient.setPicture(fileUpload(multipartFile));
				}else {
					return ResponseHandler.generateResponse("Wrong image file", HttpStatus.BAD_REQUEST);
				}
			}	
			
			patientService.save(patient);
			return ResponseHandler.generateResponse("Patient created", HttpStatus.CREATED);
		}catch(IOException e) {
			return ResponseHandler.generateResponse("Error", HttpStatus.BAD_REQUEST);
        }
		
	}
	
	//Read Patient
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@GetMapping("/{id}")
	public ResponseEntity<?> read (@PathVariable(value = "id") Long patientId){
		Optional<Patient> oPatient= patientService.findById(patientId);
		
		if(!oPatient.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(oPatient);
	}
	
	//Update an Patient
	@PutMapping("/{id}")
	public ResponseEntity update (String patientDataString,
			@RequestParam(name = "image", required = false) MultipartFile multipartFile, 
			@PathVariable(value = "id") Long patientId) throws IOException {
		
		try {
			Patient patientData = stringToObject(patientDataString);
			Optional<Patient> patient = patientService.findById(patientId);
						
			if(!patient.isPresent()) {
				return ResponseEntity.notFound().build();
			}
			
			if (multipartFile != null) {
				String fileType = multipartFile.getContentType();

				if(fileType.equals("image/jpeg") || fileType.equals("image/png")) {
					
					patient.get().setPicture(fileUpload(multipartFile));
				}else {
					return ResponseHandler.generateResponse("Wrong image file", HttpStatus.BAD_REQUEST);
				}
			}	
			
			long now = System.currentTimeMillis();
	        
			patient.get().setFirstName(patientData.getFirstName());
			patient.get().setLastName(patientData.getLastName());
			patient.get().setBirthday(patientData.getBirthday());
			patient.get().setAddress(patientData.getAddress());
			patient.get().setUpdateAt(new java.sql.Timestamp(now));
			
			patientService.save(patient.get());
			
			return ResponseHandler.generateResponse("Patient updated", HttpStatus.OK);
				
		}catch(IOException e) {
			return ResponseHandler.generateResponse("Error", HttpStatus.BAD_REQUEST);
	    }
	}
	
	 //Delete an Patient
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete (@PathVariable(value = "id") Long patientId){
		if(!patientService.findById(patientId).isPresent()) {
			return ResponseHandler.generateResponse("Patient not found", HttpStatus.NOT_FOUND);
		}
		
		patientService.deleteById(patientId);
		return ResponseHandler.generateResponse("Patient deleted", HttpStatus.OK);
	}
	
	@GetMapping()
	public Page<IPatientProjection> findAll(
			@RequestParam Optional<String> firstName,
			  @RequestParam Optional<String> lastName,
			  @RequestParam Optional<String> birthday,
			  @RequestParam Optional<String> address,
			  @RequestParam Optional<String> sortBy,
			  @RequestParam Optional<String> direction,
			  @RequestParam Optional<Integer> size,
			  @RequestParam Optional<Integer> page) {
	
	  Sort sortPatient = Sort.by(direction.orElse("desc").equals("asc") 
	  ? Direction.ASC 
	  : Direction.DESC, 
	  sortBy.orElse("last_name"));
		  
	  Pageable paging = PageRequest.of(page.orElse(0), 
			  size.orElse(25), 
			  sortPatient);
	  
	  if(firstName.isPresent()) {  
		  return patientService.findByFirstName(firstName.orElse(""), paging);  
	  }
	  else if(lastName.isPresent()) {
		  return patientService.findByLastName(lastName.orElse(""), paging);  
	  } else if(birthday.isPresent()) {
		  return patientService.findByBirthday(birthday.orElse(""), paging);  
	  } else if(address.isPresent()) {
		  return patientService.findByAddress(address.orElse(""), paging);  
	  } else {
		  return patientService.findAllPatients(paging); 
	  }
	  
	}
	
	private Patient stringToObject(String patientData) {
		
		Patient patient = new Patient();
		
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			patient = objectMapper.readValue(patientData, Patient.class);
		}catch(IOException err) {
			System.out.printf("Error", err.toString());
		}
		
		return patient;
	}
	
	private String fileUpload(MultipartFile multipartFile) throws IOException {
		
		long now = System.currentTimeMillis();
		 
		String fileType = multipartFile.getContentType();
		String fileName = "";
		if(fileType.equals("image/jpeg")){
			fileName = Long.toString(now) + randNumber() + ".jpg";
		} else {
			fileName = Long.toString(now) + randNumber() + ".png";
		}
		
        String uploadDir = "./images";
        
        Path uploadPath = Paths.get(uploadDir);
        
        if(!Files.exists(uploadPath)) {
        	try {
				Files.createDirectories(uploadPath);
			} catch (IOException e) {
				e.printStackTrace();
			}
        }
        
        try (InputStream inputStream = multipartFile.getInputStream()){
        	Path filePath = uploadPath.resolve(fileName);
        	Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }catch(IOException e) {
        	throw new IOException();
        }
        
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/images/")
				.path(fileName)
				.toUriString();
		
		return fileDownloadUri;
	}
	
	private Patient addDate(Patient patient) {
		
		long now = System.currentTimeMillis();
		patient.setUpdateAt(new java.sql.Timestamp(now));
		patient.setCreatedAt(new java.sql.Timestamp(now));
		
		return patient;
	}
	
	private Patient addUpdateDate(Patient patient) {
		
		long now = System.currentTimeMillis();
		patient.setUpdateAt(new java.sql.Timestamp(now));
		
		return patient;
	}
	
	private String randNumber() {
		
		int min = 1;
		int max = 99;
        int random_int = (int)Math.floor(Math.random()*(max-min+1)+min);
        
        return Integer.toString(random_int);
	}
}
