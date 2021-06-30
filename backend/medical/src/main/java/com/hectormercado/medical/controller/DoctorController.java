package com.hectormercado.medical.controller;

import java.util.Optional;
import java.io.*;
import java.nio.file.*;

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
import com.hectormercado.medical.entity.Doctor;
import com.hectormercado.medical.projection.IDoctorProjection;
import com.hectormercado.medical.service.DoctorService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/doctors")
public class DoctorController {

	@Autowired
	private DoctorService doctorService;

	@PostMapping()
	public ResponseEntity uploadToLocalFileSystem(String doctorData,
			@RequestParam(name = "image", required = false) MultipartFile multipartFile
			) throws IOException {
		
		try {
			Doctor doctor = stringToObject(doctorData);
			doctor = addDate(doctor);
			
			if (multipartFile != null) {
				String fileType = multipartFile.getContentType();

				if(fileType.equals("image/jpeg") || fileType.equals("image/png")) {
					
					doctor.setPicture(fileUpload(multipartFile));
				}else {
					return ResponseHandler.generateResponse("Wrong image file", HttpStatus.BAD_REQUEST);
				}
			}	
			
			doctorService.save(doctor);
			return ResponseHandler.generateResponse("Doctor created", HttpStatus.CREATED);
		}catch(IOException e) {
			return ResponseHandler.generateResponse("Error", HttpStatus.BAD_REQUEST);
        }
		
	}
		
	//Read Doctor
	@GetMapping("/{id}")
	public ResponseEntity<?> read (@PathVariable(value = "id") Long doctorId){
		Optional<Doctor> oDoctor= doctorService.findById(doctorId);
		
		if(!oDoctor.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(oDoctor);
	}
	
	//Update an Doctor
	@PutMapping("/{id}")
	public ResponseEntity update (String doctorDataString,
			@RequestParam(name = "image", required = false) MultipartFile multipartFile, 
			@PathVariable(value = "id") Long doctorId) throws IOException {
		
		try {
			Doctor doctorData = stringToObject(doctorDataString);
			Optional<Doctor> doctor = doctorService.findById(doctorId);
						
			if(!doctor.isPresent()) {
				return ResponseEntity.notFound().build();
			}
			
			if (multipartFile != null) {
				String fileType = multipartFile.getContentType();

				if(fileType.equals("image/jpeg") || fileType.equals("image/png")) {
					
					doctor.get().setPicture(fileUpload(multipartFile));
				}else {
					return ResponseHandler.generateResponse("Wrong image file", HttpStatus.BAD_REQUEST);
				}
			}	
			
			long now = System.currentTimeMillis();
	        
			doctor.get().setFirstName(doctorData.getFirstName());
			doctor.get().setLastName(doctorData.getLastName());
			doctor.get().setBirthday(doctorData.getBirthday());
			doctor.get().setAddress(doctorData.getAddress());
			doctor.get().setUpdateAt(new java.sql.Timestamp(now));
			
			doctorService.save(doctor.get());
			
			return ResponseHandler.generateResponse("Doctor updated", HttpStatus.OK);
				
		}catch(IOException e) {
			return ResponseHandler.generateResponse("Error", HttpStatus.BAD_REQUEST);
	    }
	}
	
	 //Delete an Doctor
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete (@PathVariable(value = "id") Long doctorId){
		if(!doctorService.findById(doctorId).isPresent()) {
			return ResponseHandler.generateResponse("Doctor not found", HttpStatus.NOT_FOUND);
		}
		
		doctorService.deleteById(doctorId);
		return ResponseHandler.generateResponse("Doctor deleted", HttpStatus.OK);
	}
		  
	@GetMapping()
	public Page<IDoctorProjection> findAll(@RequestParam Optional<String> firstName,
			  @RequestParam Optional<String> lastName,
			  @RequestParam Optional<String> birthday,
			  @RequestParam Optional<String> speciality,
			  @RequestParam Optional<String> sortBy,
			  @RequestParam Optional<String> direction,
			  @RequestParam Optional<Integer> size,
			  @RequestParam Optional<Integer> page) {
	
	  Sort sortDoctor = Sort.by(direction.orElse("desc").equals("asc") 
	  ? Direction.ASC 
	  : Direction.DESC, 
	  sortBy.orElse("last_name"));
		  
	  Pageable paging = PageRequest.of(page.orElse(0), 
			  size.orElse(25), 
			  sortDoctor);
	  
	  if(firstName.isPresent()) {
		  return doctorService.findByFirstName(firstName.orElse(""), paging);  
	  } else if(lastName.isPresent()) {
		  return doctorService.findByLastName(lastName.orElse(""), paging);  
	  } else if(birthday.isPresent()) {
		  return doctorService.findByBirthday(birthday.orElse(""), paging);  
	  } else if(speciality.isPresent()) {
		  return doctorService.findBySpeciality(speciality.orElse(""), paging);  
	  } else {
		  return doctorService.findByAllDoctors(paging); 
	  }
	  
	}
	
	private Doctor stringToObject(String doctorData) {
		
		Doctor doctor = new Doctor();
		
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			doctor = objectMapper.readValue(doctorData, Doctor.class);
		}catch(IOException err) {
			System.out.printf("Error", err.toString());
		}
		
		return doctor;
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
	
	private Doctor addDate(Doctor doctor) {
		
		long now = System.currentTimeMillis();
		doctor.setUpdateAt(new java.sql.Timestamp(now));
		doctor.setCreatedAt(new java.sql.Timestamp(now));
		
		return doctor;
	}
	
	private Doctor addUpdateDate(Doctor doctor) {
		
		long now = System.currentTimeMillis();
		doctor.setUpdateAt(new java.sql.Timestamp(now));
		
		return doctor;
	}
	
	private String randNumber() {
		
		int min = 1;
		int max = 99;
        int random_int = (int)Math.floor(Math.random()*(max-min+1)+min);
        
        return Integer.toString(random_int);
	}
}
