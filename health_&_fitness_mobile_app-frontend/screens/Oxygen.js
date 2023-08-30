import React,{useState,useEffect} from "react";
import { View } from "react-native";
import AnalyticsButtons from "../components/Activity/AnalyticButtons";
import HealthCheck from "../components/Activity/healthCheck";

const OxygenLevel = ({ navigation }) => {
  const [OxygenValue, setOxygenValue] = useState(0);

  useEffect(() => {
    if (OxygenValue <=70 && OxygenValue>0) {
      alert("Your Oxygen precentage less than abnormal Value");
    } 
  }, [OxygenValue]);

  const handleClick = async () => {
    try {
      // Fetch temperature value from backend
      const response = await fetch(
        "http://localhost:8080/api/oxygen/getOxygen",
        {
          method: "POST",
        }
      );
      const value = await response.text();

      // Update temperature value in the component
      setOxygenValue(value.toString());
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const [displayValue, setDisplayValue] = useState("");
  // const [value, setValue] = useState("0");
  // const handleInputChange = (text) => {
  // };
  // const handleButtonPress = () => {
  //   setDisplayValue(text);
  //   alert(`The input value is ${displayValue}`);
  // };
  // const [inputValue, setInputvalue] = useState("");
  // const handleInputValue = (text) => {
  //   setInputvalue(text);
  // };
  // const hadleClick=()=>{
  //   const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   // const validate=/^[0-9]*$/
  //   if(!regex.test(inputValue)){
  //     alert("enter a valid email")
  //   }
  //   else{
  //     alert(inputValue);
  //   }

  // }
  // const [displayValue, setDisplayValue] = useState("");
  // const getValue=()=>{
  //      navigation.navigate("BMI",{displayValue})
  // }

  return (
    <View>
      <AnalyticsButtons navigation={navigation}/>
      <HealthCheck
        navigation={navigation}
        title="OXYGEN LEVEL"
        measurementValue={OxygenValue}
        icon="hand-holding-heart"
        unit="SpO2"
        measuringText="Measuring Oxygen Level"
        checkText="Check"
        handleClick={handleClick}
      />
    </View>
  );
};


export default OxygenLevel;
