package com.dfmba.aicc.eurekaAuthClient.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthApiController {

    @GetMapping
    public String authTest() {
        return "authTest";
    }


}
