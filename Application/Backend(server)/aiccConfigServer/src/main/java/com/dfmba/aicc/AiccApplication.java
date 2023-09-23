package com.dfmba.aicc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class AiccApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiccApplication.class, args);
	}

}
