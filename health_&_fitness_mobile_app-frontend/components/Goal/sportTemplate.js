import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "@react-native-material/core";
const width_content = "60%";
const SportTemplate = ({
  isADistance,
  count,
  goalValue,
  sportType,
  getDisplayTime,
  updateValue,
  toggle,
  isActive,
  handlePausePress,
  resumeCounting,
  reset,
  deleteTemplate,
}) => {
  return (
    <View style={styles.content}>
      <View style={styles.box}>
        <View style={styles.boxContent}>
          <Text style={{ fontSize: 20, color: "white" }}>THIS WEEK</Text>
          {isADistance ? (
            <Text style={{ fontSize: 40, color: "rgb(76, 30, 129)" }}>
              {count}
            </Text>
          ) : (
            <Text style={{ fontSize: 40, color: "white" }}>
              {getDisplayTime()}
            </Text>
          )}
          <Text style={{ fontSize: 20, color: "white" }}>
            <Text style={{ fontSize: 20 }}>{goalValue}</Text>{" "}
            {isADistance ? sportType ==="Walking"? "Steps" : "meters" : "minites"}
          </Text>

          <Icon
            style={{ marginTop: 10 }}
            name="running"
            size={30}
            color="white"
          />
          <Text style={{ fontSize: 20, color: "white" }}>{sportType}</Text>
        </View>
      </View>
      <View style={styles.bottomContent}>
        <View>
          <Icon
            style={{ marginRight: 5 }}
            name="calendar-alt"
            size={30}
            color="rgb(76, 90, 129)"
          />
        </View>
        <View>
          <Text style={{ color: "rgb(76, 90, 129)" }}>
            <Text>7</Text> Days{" "}
          </Text>
          <Text style={{ color: "rgb(76, 90, 129)" }}>Remain</Text>
        </View>
      </View>
      <View>
        <Button
          style={styles.bottomButton}
          onPress={isADistance ? updateValue : toggle}
          title={isADistance ? "start" : isActive ? "pause" : "start"}
          color="white"
          titleStyle={{ color: "rgb(76, 90, 129)" }}
          marginTop={10}
          leading={(props) => (
            <Icon
              name="hourglass-start"
              {...props}
              color="rgb(76, 90, 129)"
            />
          )}
        ></Button>
        <Button
          style={styles.bottomButton}
          title="Delete"
          color="white"
          titleStyle={{ color: "rgb(76, 90, 129)" }}
          leading={(props) => (
            <Icon name="trash-alt" {...props} color="rgb(76, 90, 129)" />
          )}
          
          onPress={deleteTemplate}
        ></Button>
        {isADistance ? (
          <View style={styles.pause_resume_btn}>
            <Button
              leading={(props) => (
                <Icon
                  name="pause"
                  {...props}
                  color="rgb(76, 90, 129)"
                  size={20}
                />
              )}
              color="white"
              titleStyle={{ color: "rgb(76, 90, 129)" }}
              onPress={handlePausePress}
            />

            <Button
              leading={(props) => (
                <Icon
                  name="caret-right"
                  {...props}
                  color="rgb(76, 90, 129)"
                  size={30}
                />
              )}
              color="white"
              titleStyle={{ color: "rgb(76, 90, 129)" }}
              onPress={resumeCounting}
            />
          </View>
        ) : (
          <Button
            title="reset"
            leading={(props) => (
              <Icon
                name="stop"
                {...props}
                size={20}
                color="rgb(76, 90, 129)"
              />
            )}
            color="white"
            titleStyle={{ color: "rgb(76, 90, 129)" }}
            onPress={reset}
          />
        )}

        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 150,
    borderWidth: 5,
    borderColor: "rgb(76, 90, 129)",
    backgroundColor: "rgb(105, 89, 203)",
    width: width_content,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  boxContent: {
    alignItems: "center",
  },
  bottomContent: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomButton: {
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  pause_resume_btn: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default SportTemplate;