import React, { useState, useEffect } from "react";
import HealthCheck from "../components/Activity/healthCheck";
import AnalyticsButtons from "../components/Activity/AnalyticButtons";
import { View } from "react-native";

const HeartRate = ({ navigation }) => {
  const [heartValue, setHeartValue] = useState(0);

  useEffect(() => {
    if (heartValue >= 110) {
      alert("Your heart beat exceeds the abnormal rate");
    }
  }, [heartValue]);

  const handleClick = async () => {
    try {
      // Fetch heart rate value from backend
      const response = await fetch(
        "http://localhost:8080/api/heartRate/getHeartRate",
        {
          method: "POST",
        }
      );
      const value = await response.text();

      // Update heart rate value in the component
      setHeartValue(value.toString());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View>
      <AnalyticsButtons navigation={navigation} />
      <HealthCheck
        navigation={navigation}
        title="Heart Rate"
        measurementValue={heartValue}
        icon="heartbeat"
        unit="BPM"
        measuringText="Measuring Heart Rate"
        checkText="Check"
        handleClick={handleClick}
      />
    </View>
  );
};
export default HeartRate;
