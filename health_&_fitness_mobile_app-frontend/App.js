import React from "react";
import Bmi from "./screens/bmi";
import HeartRate from "./screens/heartRate";
import Temp from "./screens/temp";
import Icon from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CurrentGoalRunning from "./screens/currentGoalRunning";
import CurrentGoalBiking from "./Screens/currentGoalBiking";
import CurrentGoalWalking from "./screens/currentgoalWalking";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Goal from "./components/Goal/Goal";
import OxygenLevel from "./screens/Oxygen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Goals"
        component={GoalStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <Icon
              name="futbol"
              color={focused ? "rgb(105, 89, 203)" : "rgb(76, 90, 129)"}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <Icon
              name="bolt"
              color={focused ? "rgb(105, 89, 203)" : "rgb(76, 90, 129)"}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const GoalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Goal"
        component={Goal}
        options={{
          title: "Add Goal",
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { color: "#000" },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Running"
        component={CurrentGoalBiking}
        options={{ title: "Running", headerShown: false }}
      />

      <Stack.Screen
        name="Walking"
        component={CurrentGoalWalking}
        options={{ title: "Walking", headerShown: false }}
      />
      <Stack.Screen
        name="Biking"
        component={CurrentGoalBiking}
        options={{ title: "Biking", headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const ActivityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Report"
        component={OxygenLevel}
        options={{ title: "Report", headerShown: false }}
      />
      <Stack.Screen
        name="Heart"
        component={HeartRate}
        options={{ title: "Heart", headerShown: false }}
      />
      <Stack.Screen
        name="Temp"
        component={Temp}
        options={{ title: "Temp", headerShown: false }}
      />
      <Stack.Screen
        name="BMI"
        component={Bmi}
        options={{ title: "BMI", headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
};

export default App;
