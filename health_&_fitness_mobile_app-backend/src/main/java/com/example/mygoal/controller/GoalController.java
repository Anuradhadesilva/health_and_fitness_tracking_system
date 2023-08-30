package com.example.mygoal.controller;

import com.example.mygoal.model.Goal;
import com.example.mygoal.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/goal")

public class GoalController {
    @Autowired
    private GoalService goalService;

    //add goal details to table
    @PostMapping("/add")
    public String add(@RequestBody Goal goal){
        goalService.saveUnique(goal.getSportType(), goal.getGoalType(), goal.getTimeframe(), goal.getValue());
        return "new goal is added";
    }

    //get goal detail
    @GetMapping("/getAll")
    public List<Goal> getAllGaol(){
        return goalService.getAllGoal();
    }

    //get goal value using sport type to front end
    @GetMapping("/{sportType}/value")
    public String getGoalValue(@PathVariable String sportType){
        return goalService.getGoalValue(sportType);
    }

    //
    @GetMapping("/{sportType}/goalType")
    public String getGoalType(@PathVariable String sportType){
        return goalService.getGoalType(sportType);
    }


    @DeleteMapping("/{sportType}")
    public ResponseEntity<Void> deleteGoal(@PathVariable String sportType){
        goalService.deleteBySportType(sportType);
        return ResponseEntity.noContent().build();
    }
}
