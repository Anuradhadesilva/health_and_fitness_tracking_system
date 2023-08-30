import {
    Button,
    Stack,
    Text,
    TextInput,
    IconButton,
  } from "@react-native-material/core";
  
  import React, { useState } from "react";
  import { StyleSheet, View, ScrollView } from "react-native";
  import Icon from "@expo/vector-icons/MaterialCommunityIcons";
  const width_proportion = "30%";
  const width_list = "20%";
  
  const goals = [
    ["sportType", "SPORT TYPE", ["running", "walking", "biking"]],
    ["timeframe", "TIME FRAME", ["per day", "per week", "per month", "per year"]],
    ["goalType", "GOAL TYPE", ["distance", "duration"]],
    ["value", "Add Goal Value"],
  ];
  
  const Goal = ({ navigation }) => {
    const [goal, setGoal] = useState({
      sportType: "",
      timeframe: "",
      goalType: "",
      value: "",
    });
    const [input, setInput] = useState("");
    const handleGoal = (index, key, item) => {
      const newGoal = { ...goal };
      if (index == 3) {
        const regex = /^[0-9]*$/;
        if (!regex.test(input)) {
          alert("must added in numeric value");
        } else {
          alert(input);
          newGoal[key] = input;
        }
      } else {
        newGoal[key] = item;
      }
      setGoal(newGoal);
      console.log(newGoal);
    };
  
    const CurrentGoals = () => {
      navigation.navigate("Running");
    };
  
    const submitGoal = () => {
      const regex = /^[0-9]*$/;
      if (!regex.test(input)) {
        alert("can`t create goal");
      } else {
        if (goal.sportType === "running") {
          navigation.navigate("Running");
        } else if (goal.sportType === "walking") {
          navigation.navigate("Walking");
        } else if (goal.sportType === "biking") {
          navigation.navigate("Biking");
        }
        fetch("http://localhost:8080/api/goal/add", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(goal),
        })
          .then(() => {
            alert("add new one");
          })
          .catch((error) => {
            console.error(error);
          });
        alert(JSON.stringify(goal, null, 3));
      }
    };
  
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text1} onPress={CurrentGoals}>
              MyGoal
            </Text>
            <Text style={styles.text2}>
              ADD GOAL<Text></Text>
            </Text>
            <Text style={styles.text3} onPress={submitGoal}>
              Save
            </Text>
          </View>
          <View style={styles.goalMapStyle}>
            {goals.map(([key, title, items], index) =>
              key != "value" ? (
                <View key={index}>
                  <Text raised primary style={styles.titletext}>
                    {title}
                  </Text>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="start"
                    wrap={true}
                  >
                    {items.map((item, index) => (
                      <Button
                        sx={{ borderRadius: "100px" }}
                        key={index}
                        style={styles.btn}
                        title={item}
                        raised
                        primary
                        onPress={() => handleGoal(index, key, item)}
                        variant={goal[key] === item ? "outlined" : "contained"}
                        color={goal[key] === item ? "white" : "#7165e3"}
                        titleStyle={{
                          color: goal[key] === item ? "#7165e3" : "white",
                        }}
                        borderWidth={goal[key] === item ? 1 : 0}
                      ></Button>
                    ))}
                  </Stack>
                </View>
              ) : (
                <View key={key + index}>
                  <Text style={styles.titletext}>Add Your Goal Value</Text>
                  <TextInput
                    placeholder={
                      goal.goalType === "distance" ?goal.sportType==="walking"?"steps":"meters" : goal.goalType
                    }
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    keyboardType="numeric"
                    variant="outlined"
                    trailing={(props) => (
                      <IconButton
                        icon={(props) => <Icon name="soccer" {...props} />}
                        {...props}
                      />
                    )}
                  ></TextInput>
  
                  <Button
                    color="#7165e3"
                    titleStyle={{ color: "white" }}
                    title="ADD"
                    style={styles.btn2}
                    onPress={() => handleGoal(index, key)}
                  ></Button>
                </View>
              )
            )}
          </View>
        </View>
      </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    container: {},
    header: {
      flexDirection: "row",
      marginTop: 30,
      backgroundColor: "#fff",
    },
    list: {
      width: width_list,
      justifyContent: "center",
      alignItems: "center",
    },
    text1: {
      float: "left",
      width: width_proportion,
      textAlign: "left",
      color: "blue",
      marginLeft: 20,
      fontSize: 20,
      color: "rgb(105, 89, 203)",
      fontWeight: "500",
    },
    text2: {
      float: "center",
      width: width_proportion,
      textAlign: "center",
      fontSize: 20,
      color: "rgb(76, 90, 129)",
      fontWeight: "500",
    },
    text3: {
      float: "right",
      width: width_proportion,
      textAlign: "right",
      fontSize: 20,
      color: "rgb(105, 89, 203)",
      fontWeight: "500",
    },
    btn: {
      width: "48%",
      margin: 3,
      padding: 10,
      borderColor: "rgb(105, 89, 203)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    btonclick: {
      borderWidth: 2,
    },
    btn2: {
      width: "100%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      padding: 10,
    },
    txtinp: {
      margin: 10,
    },
    titletext: {
      fontSize: 18,
      margin: 10,
      marginLeft: 20,
      fontWeight: "500",
      color: "rgb(76, 90, 129)",
    },
    goalMapStyle: {
      marginTop: 10,
    },
  });
  
  export default Goal;
  