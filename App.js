import { StatusBar } from "expo-status-bar";
import React from "react";
import { Settings, StyleSheet, Text, View } from "react-native";
import Login from "./components/Login";
import MapView from "./components/MapView";
import ListView from "./components/ListView";
import AddGiveawayForm from "./components/AddGiveawayForm";
import Ranking from "./components/Ranking";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    // <View style={styles.container}>
    //   <Text>Hello</Text>
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapView"
          component={MapView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListView"
          component={ListView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddForm"
          component={AddGiveawayForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ranking"
          component={Ranking}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7BBA83",
    alignItems: "center",
    justifyContent: "center",
  },
});
