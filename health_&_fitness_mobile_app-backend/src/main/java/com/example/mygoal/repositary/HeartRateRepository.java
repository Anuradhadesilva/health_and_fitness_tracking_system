package com.example.mygoal.repositary;

import com.example.mygoal.model.HeartRate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HeartRateRepository extends JpaRepository <HeartRate,Integer> {
    List<HeartRate> findAllByOrderByTimeStampDesc();
}
