import React, { useState, useEffect, useRef } from "react";
import { Settings, StyleSheet, Text, View, StatusBar } from "react-native";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ListView from "./components/ListView";
import AddGiveawayForm from "./components/AddGiveawayForm";
import Ranking from "./components/Ranking";
import AddSubmission from "./components/AddSubmission";
import CustomMapView from "./components/CustomMapView";
import PlannerInfo from "./components/PlannerInfo";
import PlannerMapView from "./components/PlannerMapView";
import PlannerAddForm from "./components/PlannerAddForm";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ToastProvider } from "react-native-toast-notifications";

import firebase from "firebase";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNavigation from "./components/DrawerNavigation";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    this.setState({ expoPushToken: "New report!" });
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
}

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

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <ToastProvider>
      <NavigationContainer>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={"dark-content"}
          showHideTransition={"fade"}
          hidden={"false"}
        />
        <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }} >
          {(props) => <Login {...props} db={db} />}
        </Stack.Screen> 
        <Stack.Screen name="SignUp" options={{ headerShown: false }}>
          {(props) => <SignUp {...props} db={db} />}
        </Stack.Screen>
          <Stack.Screen
            name="Home"
            options={{
              headerShown: false,
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          >
            {(props) => <DrawerNavigation {...props} db={db} />}
          </Stack.Screen>
          <Stack.Screen
            name="PlannerInfo"
            component={PlannerInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlannerMapView"
            component={PlannerMapView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlannerAddForm"
            component={PlannerAddForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="ListView" options={{ headerShown: false }}>
          {(props) => <ListView {...props} db={db} />}
        </Stack.Screen>
          {/* <Stack.Screen name="AddForm" options={{ title: "Submit a giveaway" }}>
            {(props) => <AddGiveawayForm {...props} db={db} />}
          </Stack.Screen>
          <Stack.Screen
            name="Ranking"
            component={Ranking}
            options={{ title: "Leaderboard" }}
          />
          <Stack.Screen
            name="AddSubmission"
            component={AddSubmission}
            options={{
              title: "Submission Rewards",
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          /> */}
        </Stack.Navigator>

        {/* <DrawerNavigation /> */}

        {/* <Stack.Navigator>
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
            options={{
              title: "Home",
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          >
            {(props) => <CustomMapView {...props} db={db} />}
          </Stack.Screen>
          <Stack.Screen
            name="PlannerInfo"
            component={PlannerInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlannerMapView"
            component={PlannerMapView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlannerAddForm"
            component={PlannerAddForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ListView"
            component={ListView}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AddForm" options={{ title: "Submit a giveaway" }}>
            {(props) => <AddGiveawayForm {...props} db={db} />}
          </Stack.Screen>
          <Stack.Screen
            name="Ranking"
            component={Ranking}
            options={{ title: "Leaderboard" }}
          />
          <Stack.Screen
            name="AddSubmission"
            component={AddSubmission}
            options={{
              title: "Submission Rewards",
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator> */}
      </NavigationContainer>
    </ToastProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#7BBA83",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
