import React, { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button } from "@react-native-material/core";
import { Text, View, StyleSheet, Image, ScrollView, Alert } from "react-native";
const width_content = "60%";
const templateButton = "90%";

import SportNavigate from "../components/Goal/sportNavigate";
import SportTemplate from "../components/Goal/sportTemplate";

const CurrentGoalRunning = ({ navigation }) => {
  const [templates, setTemplates] = useState([]);
  const [goalValue, setGoalValue] = useState("");
  const [count, setCount] = useState(0);
  const [goaltype, setGoalType] = useState("");
  const [isADistance, setIsGoalType] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  //StopWatch
  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const getDisplayTime = () => {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const second = Math.floor(seconds % 60);
    return `${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""}${minute}:${
      second < 10 ? "0" : ""
    }${second}`;
  };

  React.useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  React.useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if(seconds >= goalValue*60){
          
          setIsActive(false)
        }else{
          setSeconds((seconds) => seconds + 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isActive]);
  //end stopwatch

  //when press start button value goes to 0
  const updateValue = () => {
    fetch("http://localhost:8080/running-update-value", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: goalValue }),
    }).then(() => {
      console.log("Value updated!");
      setCount(0);
    });
  };

  const handlePausePress = () => {
    fetch("http://localhost:8080/running-pause-counting", {
      method: "POST",
    });
  };
  const resumeCounting = () => {
    fetch("http://localhost:8080/running-resume-counting", {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to resume counting");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //get counting value after 5 second
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8080/running-get-value")
        .then((response) => response.json())
        .then((json) => {
          setCount(json.value);
          console.log("Current value:", json.value);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  //get goal Achivement Value route(Display in template)
  useEffect(() => {
    fetch("http://localhost:8080/api/goal/running/value")
      .then((response) => response.json())
      .then((data) => {
        setGoalValue(data);
        // alert("ADD goalValue TO RUNNING");
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Create a New Goal in MyGoal");
      });
  }, []);

  //get goal type
  useEffect(() => {
    fetch("http://localhost:8080/api/goal/running/goalType")
      .then((response) => response.text())
      .then((data) => {
        setGoalType(data);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("error");
      });
  }, []);

  //change duration and distance template
  useEffect(() => {
    if (goaltype === "duration") {
      setIsGoalType(false);
    } else if (goaltype === "distance") {
      setIsGoalType(true);
    } else {
      console.log("error");
    }
  });

  //create template
  const createTemplate = () => {
    if (templates.length < 1) {
      const newTemplate = {};
      // const newTemplate = { title: input };
      setTemplates([...templates, newTemplate]);
    } else {
      alert("You cannot create any more templates.");
    }
  };

  const deleteTemplate = (index) => {
    fetch("http://localhost:8080/api/goal/running", {
      method: "DELETE",
    })
      .then(() => {
        alert("Delete data");
      })
      .catch((error) => {
        console.error(error);
      });
    const newTemplates = [...templates];
    newTemplates.splice(index, 1);
    setTemplates(newTemplates);
  };

  return (
    <ScrollView>
      <SportNavigate navigation={navigation} />
      <View style={styles.template}>
        <Button
          style={styles.templatebutton}
          titleStyle={{ color: "rgb(105, 89, 203)" }}
          title="Create template"
          onPress={() => createTemplate()}
          variant="outlined"
        />
      </View>

      {templates.map((template, index) => (
        <SportTemplate
          key={index}
          isADistance={isADistance}
          count={count}
          goalValue={goalValue}
          sportType="Running"
          getDisplayTime={getDisplayTime}
          updateValue={updateValue}
          toggle={toggle}
          isActive={isActive}
          handlePausePress={handlePausePress}
          resumeCounting={resumeCounting}
          reset={reset}
          deleteTemplate={() => deleteTemplate(index)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  template: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  header: {
    flexDirection: "row",
    marginTop: 30,
  },
  template: {
    alignItems: "center",
    justifyContent: "center",
  },
  templatebutton: {
    width: templateButton,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "rgb(105, 89, 203)",
  },
});

export default CurrentGoalRunning;
