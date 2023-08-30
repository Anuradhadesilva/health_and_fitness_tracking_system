
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text } from "@react-native-material/core";
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const BMICheck = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [desc, setDesc] = useState("");

  const getBMI = () => {
    const regex = /^[0.01-9.99]*$/;
    if (regex.test(weight) && regex.test(height)) {
      if (height > 0 && height <= 3) {
        const bmi = weight / (height * height);
        setBmi(bmi.toFixed(1));
        if (bmi >= 20 && bmi <= 30) {
          setDesc("normal");
        } else if (bmi <= 20) {
          setDesc("lowWeight");
        } else {
          setDesc("OverWeight");
        }
      } else {
        alert("Height must be in Meter.CM value. Example: 1.70 M.cm");
      }
    } else {
      alert("Height and Weight must be numeric values");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Button
        style={styles.btn}
        titleStyle={{ color: "rgb(105, 89, 203)" }}
        title="Cancel"
        color="white"
        onPress={() => navigation.navigate("Report")}
      ></Button> */}
      <View style={styles.box}>
        <Text style={styles.header}>BMI</Text>
        <Text style={styles.bmiText}>{bmi}</Text>
        <Text style={styles.descText}>{desc}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Weight:</Text>
        <TextInput
          placeholder="KG"
          variant="outlined"
          trailing={(props) => (
            <IconButton
              icon={(props) => <Icon name="eye" {...props} />}
              {...props}
            />
          )}
          onChangeText={(x) => setWeight(x)}
        />

        <Text style={styles.label}>Height:</Text>
        <TextInput
          placeholder="meter.cm"
          variant="outlined"
          trailing={(props) => (
            <IconButton
              icon={(props) => <Icon name="eye" {...props} />}
              {...props}
            />
          )}
          onChangeText={(x) => setHeight(x)}
        />
        <View style={styles.btnView}>
          <Button
            style={styles.btn}
            color="rgb(105, 89, 203)"
            title="Check"
            onPress={getBMI}
            marginTop={50}
            padding={5}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    borderRadius: 120,
    borderWidth: 5,
    borderColor: "rgb(76, 90, 129)",
    width: "50%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    marginTop: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "500",
    color: "rgb(76, 90, 129)",
  },
  btn: {
    marginBottom: 20,
    padding: 8,
  },
  header: {
    fontSize: 30,
    color: "rgb(105, 89, 203)",
    fontWeight: "500",
  },
  bmiText: {
    fontSize: 45,
    color: "rgb(105, 89, 203)",
    fontWeight: "500",
  },
  descText: {
    fontSize: 25,
    color: "rgb(105, 89, 203)",
    fontWeight: "500",
  },
  btnView: {
    marginTop: 15,
  },
});

export default BMICheck;