import React from "react";
import { Settings, StyleSheet, Text, View } from "react-native";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ListView from "./components/ListView";
import AddGiveawayForm from "./components/AddGiveawayForm";
import Ranking from "./components/Ranking";
import AddSubmission from "./components/AddSubmission";
import CustomMapView from "./components/CustomMapView";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import firebase from "firebase";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDd0HmURysb-s2S8DU9oqH8NafbAemvyzY",
  authDomain: "freebee-22ac9.firebaseapp.com",
  projectId: "freebee-22ac9",
  storageBucket: "freebee-22ac9.appspot.com",
  messagingSenderId: "729239388132",
  appId: "1:729239388132:web:5379c961203fdd0afb11f1",
  measurementId: "G-T5DGFMK68D",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();

db.collection("users")
  .doc("Yichen")
  .set({
    firstName: "Yichen",
    lastName: "Zhang",
    school: "Georgia Tech",
  })
  .then(() => {
    console.log("Document successfully written!");
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  });

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapView"
          component={CustomMapView}
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
        <Stack.Screen
          name="AddSubmission"
          component={AddSubmission}
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
