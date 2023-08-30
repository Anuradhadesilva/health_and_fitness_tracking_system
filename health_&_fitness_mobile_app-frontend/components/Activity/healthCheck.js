import { Button, Text } from "@react-native-material/core";
import { StyleSheet, View,Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
const width_proportion = "30%";
const screenWidth = Dimensions.get("window").width;
const circleSize = screenWidth * 0.7;
const HealthCheck = ({
  navigation,
  title,
  measurementValue,
  icon,
  unit,
  unitSize,
  measuringText,
  checkText,
  handleClick,
}) => {
  const renderIcon = () => {
    if (title === "Heart Rate" || title === "OXYGEN LEVEL") {
      return (
        <Icon
          style={{ marginTop: 25 }}
          name="heartbeat"
          size={30}
          color="rgb(105, 89, 203)"
        />
      );
    }
  };
  const renderLargeIcon = () => {
    if (title === "Heart Rate") {
      return (
        <Icon
          style={{ marginTop: 10 }}
          name="heartbeat"
          size={100}
          color="red"
        />
      );
    } else if (title === "OXYGEN LEVEL") {
      return (
        <Icon
          style={{ marginTop: 10 }}
          name="hand-holding-heart"
          size={100}
          color={"rgb(105, 89, 203)"}
        />
      );
    } else {
      return (
        <Icon
          style={{ marginTop: 10 }}
          name="temperature-high"
          size={100}
          color={"#FAD02C"}
        />
      );
    }
  };
  return (
    <View style={styles.content}>
      <View style={styles.title}>
        <Text style={styles.title1}>Tap START to BEGIN</Text>
        <Text style={styles.title2}>Finished</Text>
      </View>
      <View style={styles.boxcontent}>
        <View style={styles.contentRate}>
          <Text variant="displayMedium" style={styles.rateValue}>
            {measurementValue}
          </Text>
          <View style={styles.image}>
            {renderIcon()}
            <Text style={{ textAlign: "center", fontSize: unitSize }}>
              {unit}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              color: "rgb(76, 90, 129)",
              fontWeight: "500",
            }}
          >
            {measuringText}
          </Text>
          {renderLargeIcon()}
          {/* <Icon
            style={{ marginTop: 10 }}
            name={icon}
            size={100}
            color={"rgb(105, 89, 203)"}
          /> */}
        </View>
      </View>
      <View style={styles.bottomBtn}>
        <Button
          title={checkText}
          style={{
            width: width_proportion,
            height: 40,
          }}
          titleStyle={{ color: "rgb(76, 90, 129)" }}
          Icon="heart"
          color="white"
          borderWidth={1}
          onPress={handleClick}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  boxcontent: {
    borderRadius: 150,
    borderWidth: 7,
    borderColor: "rgb(76, 90, 129)",
    width: circleSize,
    height: circleSize,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },

  title: {
    backgroundColor: "lightgrey",
    height: 80,
    marginTop: 20,
  },
  title1: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 20,
    fontWeight: 500,
    color: "rgb(76, 90, 129)",
  },
  title2: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 20,
    color: "rgb(105, 89, 203)",
    fontWeight: 500,
  },
  contentRate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rateValue: {
    color: "rgb(76, 90, 129)",
    fontSize: 70,
    paddingTop: 10,
  },
  bottomBtn: {
    justifyContent: "absolute",
    alignItems: "center",
    marginTop: 400,
  },
});
export default HealthCheck;
