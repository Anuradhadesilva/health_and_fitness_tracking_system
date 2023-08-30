package com.example.mygoal.controller;

import com.example.mygoal.model.Goal;
import com.example.mygoal.model.HeartRate;
import com.example.mygoal.repositary.HeartRateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;
import java.util.List;
import java.util.Random;

@CrossOrigin
@RestController
@RequestMapping("/api/heartRate")
public class HeartRateController {
    @Autowired
    HeartRateRepository heartRateRepository;

    @PostMapping("/getHeartRate")
    public ResponseEntity<Integer> getHeartValue(){
        // Make an HTTP request to back-end B to get Heart rate Value
        RestTemplate restTemplate=new RestTemplate();
        String backendBurl="http://localhost:8080/api/generate/generateHeartRate";
        ResponseEntity<Integer> response=restTemplate.getForEntity(backendBurl, Integer.class);
        return response;
    }


//    @GetMapping("/getValues")
//    public List<HeartRate> getAllRateValues(){
//        return heartRateRepository.findAllByOrderByTimeStampDesc();
//    }
//
//    @PostMapping("/addValues")
//    public HeartRate addValue(@RequestBody  HeartRate heartRate){
//        heartRate.setTimeStamp(new Timestamp(System.currentTimeMillis()));
//       return heartRateRepository.save(heartRate);
//    }

//   @GetMapping()
//    public List<HeartRate> getAllRateValues(){
//        return heartRateRepository.findAllByOrderByTimeStampDesc();
//    }
}
