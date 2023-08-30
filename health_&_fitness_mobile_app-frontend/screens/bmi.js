import React from "react";
import BMICheck from "../components/Activity/bmiCheck";
import { View } from "react-native";
import AnalyticsButtons from "../components/Activity/AnalyticButtons";

const BMI = ({navigation}) => {
  return (
    <View>
      <AnalyticsButtons navigation={navigation}/>
      <BMICheck />
    </View>
  );
};
export default BMI;
