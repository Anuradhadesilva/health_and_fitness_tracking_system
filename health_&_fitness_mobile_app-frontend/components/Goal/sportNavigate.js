import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Button } from "@react-native-material/core";

const width_proportion = "30%";

const SportNavigate = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleRunningPress = () => {
    navigation.navigate("Running");
    setSelectedButton("Running");
  };

  const handleWalkingPress = () => {
    navigation.navigate("Walking");
    setSelectedButton("Walking");
  };

  const handleBikingPress = () => {
    navigation.navigate("Biking");
    setSelectedButton("Biking");
  };

  const isButtonSelected = (button) => {
    return selectedButton === button;
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          raised
          primary
          style={[
            styles.button,
            isButtonSelected("Running") && styles.selectedButton,
          ]}
          title="Running"
          titleStyle={{
            color: isButtonSelected("Running") ? "white" : "rgb(105, 89, 203)",
          }}
          color={isButtonSelected("Running") ? "rgb(105, 89, 203)" : "white"}
          onPress={handleRunningPress}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={[
            styles.button,
            isButtonSelected("Walking") && styles.selectedButton,
          ]}
          titleStyle={{
            color: isButtonSelected("Walking") ? "white" : "rgb(105, 89, 203)",
          }}
          title="Walking"
          color={isButtonSelected("Walking") ? "rgb(105, 89, 203)" : "white"}
          onPress={handleWalkingPress}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={[
            styles.button,
            isButtonSelected("Biking") && styles.selectedButton,
          ]}
          titleStyle={{
            color: isButtonSelected("Biking") ? "white" : "rgb(105, 89, 203)",
          }}
          title="Biking"
          color={isButtonSelected("Biking") ? "rgb(105, 89, 203)" : "white"}
          onPress={handleBikingPress}
        />
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const buttonWidth = windowWidth * 0.3;
const buttonSeparatorWidth = 4;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal:
      (windowWidth - buttonWidth * 3 - buttonSeparatorWidth * 2) / 2,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    width: buttonWidth,
    marginHorizontal: buttonSeparatorWidth / 2,
    borderWidth: 1,
    borderColor: "rgb(105, 89, 203)",
  },
  selectedButton: {
    backgroundColor: "rgb(105, 89, 203)",
  },
  
});

export default SportNavigate;
