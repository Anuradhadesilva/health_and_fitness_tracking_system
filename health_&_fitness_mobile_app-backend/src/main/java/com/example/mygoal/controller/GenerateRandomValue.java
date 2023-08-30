package com.example.mygoal.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@CrossOrigin
@RestController
@RequestMapping("/api/generate")
public class GenerateRandomValue {
    @GetMapping("/generateHeartRate")
    public int generateHeartValue() {
        Random random = new Random();
        return random.nextInt(101) + 50;
    }
    @GetMapping("/generateOxygen")
    public int generateOxygenValue() {
        Random random = new Random();
        return random.nextInt(50) + 50;
    }
    @GetMapping("/generateTemp")
    public int generateTemperature(){
        Random random=new Random();
        return random.nextInt(10)+30;
    }
}
