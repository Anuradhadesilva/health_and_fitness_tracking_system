import React, { useState, useEffect } from "react";
import HealthCheck from "../components/Activity/healthCheck";
import AnalyticsButtons from "../components/Activity/AnalyticButtons";
import { View } from "react-native";

const Temperature = ({ navigation }) => {
  const [temperatureValue, setTemperatureValue] = useState(0);

  useEffect(() => {
    if (temperatureValue >= 38) {
      alert("Your Heartrate exceed abnormal Heartrate");
    } else if (temperatureValue <= 33 && temperatureValue >= 30) {
      alert("your Heartrate less than abnormal Heartrate");
    }
  }, [temperatureValue]);

  const handleClick = async () => {
    try {
      // Fetch temperature value from backend
      const response = await fetch(
        "http://localhost:8080/api/temperature/getTemperature",
        {
          method: "POST",
        }
      );
      const value = await response.text();

      // Update temperature value in the component
      setTemperatureValue(value.toString());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View>
      <AnalyticsButtons navigation={navigation} />
      <HealthCheck
        navigation={navigation}
        title="Temperature"
        measurementValue={temperatureValue}
        icon="temperature-high"
        unit="°C"
        unitSize={40}
        measuringText="Measuring Temperature"
        checkText="Check"
        handleClick={handleClick}
      />
    </View>
  );
};
export default Temperature;
