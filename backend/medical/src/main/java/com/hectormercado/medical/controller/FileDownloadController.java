package com.hectormercado.medical.controller;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class FileDownloadController implements WebMvcConfigurer {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		Path brandUploadDir = Paths.get("./images");
		String brandUploadPath = brandUploadDir.toFile().getAbsolutePath();
		
		registry.addResourceHandler("/images/**").addResourceLocations("file:/" + brandUploadPath + "/");
	}
	
}
