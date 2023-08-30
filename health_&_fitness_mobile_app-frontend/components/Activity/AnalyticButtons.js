import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "@react-native-material/core";

const AnalyticsButtons = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
  };
  const getButtonColor = (buttonName) => {
    return activeButton === buttonName ? styles.activeButton : styles.button;
  };
  const handleReportPress = () => {
    handleButtonPress("Report");
    navigation.navigate("Report");
  };
  const handleHeartPress = () => {
    handleButtonPress("Heart");
    navigation.navigate("Heart");
  };
  const handleTempPress = () => {
    handleButtonPress("Temp");
    navigation.navigate("Temp");
  };
  const handleBMIPress = () => {
    handleButtonPress("BMI");
    navigation.navigate("BMI");
  };
  return (
    <View style={styles.buttonGroup}>
      <View style={styles.buttonContainer}>
        <Button
          style={getButtonColor("Heart")}
          titleStyle={[
            styles.buttonTitle,
            activeButton === "Heart" && styles.activeButtonTitle,
          ]}
          title="Heart Rate"
          variant="outlined"
          onPress={handleHeartPress}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={getButtonColor("Temp")}
          titleStyle={[
            styles.buttonTitle,
            activeButton === "Temp" && styles.activeButtonTitle,
          ]}
          title="Temperature"
          variant="outlined"
          onPress={handleTempPress}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={getButtonColor("BMI")}
          titleStyle={[
            styles.buttonTitle,
            activeButton === "BMI" && styles.activeButtonTitle,
          ]}
          title="BMI"
          variant="outlined"
          onPress={handleBMIPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  buttonContainer:{
    flex: 1,
  },
  // button: {
  //   flex: 1,
  //   marginRight: 8,
  // },
  buttonTitle: {
    color: "rgb(76, 90, 129)",
    fontSize: 12,
    textAlign: "center",
  },
  activeButton: {
    backgroundColor: "rgb(105, 89, 203)",
  },
  activeButtonTitle: {
    color: "white",
  },
});

export default AnalyticsButtons;
