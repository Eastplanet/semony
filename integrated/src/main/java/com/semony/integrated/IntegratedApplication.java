package com.semony.integrated;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class IntegratedApplication {

	public static void main(String[] args) {
		SpringApplication.run(IntegratedApplication.class, args);
	}

}
