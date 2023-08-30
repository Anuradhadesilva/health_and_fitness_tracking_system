import React, { useState, useEffect, useRef } from "react";
import { Button } from "@react-native-material/core";
import { Text, View, StyleSheet, Image, Alert } from "react-native";
import SportNavigate from "../components/Goal/sportNavigate";
import SportTemplate from "../components/Goal/sportTemplate";
const width_proportion = "30%";
const width_content = "60%";
const templateButton = "90%";

const CurrentGoalBiking = ({ navigation }) => {
  const [templates, setTemplates] = useState([]);
  const [goalValue, setGoalValue] = useState("");
  const [count, setCount] = useState(0);
  const [goaltype, setGoalType] = useState("");
  const [isADistance, setIsGoalType] = useState(false);

  //stopwatch
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

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
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isActive]);
  //end stopwatch

  //get goalValue from database
  const updateValue = () => {
    fetch("http://localhost:8080/biking-update-value", {
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
  //post pause request
  const handlePausePress = () => {
    fetch("http://localhost:8080/biking-pause-counting", {
      method: "POST",
    });
  };
  const resumeCounting = () => {
    fetch("http://localhost:8080/biking-resume-counting", {
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
  //use get updated value
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8080/biking-get-value")
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

  useEffect(() => {
    fetch("http://localhost:8080/api/goal/biking/value")
      .then((response) => response.json())
      .then((data) => {
        setGoalValue(data);
        // alert("ADD VALUE TO Biking");
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Create a New Goal in MyGoal");
      });
  }, []);


  useEffect(() => {
    fetch("http://localhost:8080/api/goal/biking/goalType")
      .then((response) => response.text())
      .then((data) => {
        setGoalType(data);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("error");
      });
  }, []);

  useEffect(() => {
    if (goaltype === "duration") {
      setIsGoalType(false);
    } else if (goaltype === "distance") {
      setIsGoalType(true);
    } else {
      console.log("error");
    }
  });

  const createTemplate = () => {
    if (templates.length < 1) {
      const newTemplate = {};
      setTemplates([...templates, newTemplate]);
    } else {
      Alert.alert("You cannot create any more templates.");
    }
  };

  const deleteTemplate = (index) => {
    fetch("http://localhost:8080/api/goal/biking", {
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
    <View>
      <SportNavigate navigation={navigation} />
   
      <View style={styles.template}>
        <Button
          style={styles.templatebutton}
          color="black"
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
          sportType="Biking"
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
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CurrentGoalBiking;
