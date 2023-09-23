package com.dfmba.aicc.eurekaAuthClient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;

@SpringBootApplication
@RefreshScope
public class EurekaAuthClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(EurekaAuthClientApplication.class, args);
	}

}
