package com.example.mygoal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@CrossOrigin
@RestController
@RequestMapping("/api/temperature")
public class TemperatureController {
    @PostMapping("/getTemperature")
    public ResponseEntity<Integer> getTempValue(){
        RestTemplate restTemplate=new RestTemplate();
        String backendCurl="http://localhost:8080/api/generate/generateTemp";
        ResponseEntity<Integer> response=restTemplate.getForEntity(backendCurl,Integer.class);
        return response;
    }

}
