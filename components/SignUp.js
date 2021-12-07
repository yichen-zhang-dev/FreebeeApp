import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Button,
  Switch,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMap, faUser } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";

var signup_uid;

export { signup_uid };

export default function Login({ navigation, db }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [viewModeListView, setViewMode] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const viewModeSwitch = () => setViewMode((previousState) => !previousState);

  function handleSignup() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Home");
        signup_uid = firebase.auth().currentUser.uid;
        // console.log(viewModeListView);
        var mode = "Map View";
        if (!viewModeListView) {
          mode = "List View";
        }
        db.collection("userprofile").doc(signup_uid).set({
          first_name: fname,
          last_name: lname,
          email: email,
          points: 0,
          viewmode: mode,
          eventPlanner: isEnabled,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text style={styles.appTitle}>FREEBEE</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <FontAwesomeIcon icon={faMap} size={96} />
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <View style={{ flex: 4 }}>
          <Text style={[styles.login, { fontSize: 30, marginBottom: 15 }]}>
            Sign Up
          </Text>
          <Text style={[styles.login, { fontSize: 16, marginBottom: 15 }]}>
            ALREADY HAVE AN ACOUNT?{" "}
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={{ textDecorationLine: "underline" }}>LOG IN</Text>
            </Pressable>
          </Text>
          <TextInput
            style={[styles.login, styles.loginForm]}
            placeholder="First Name"
            placeholderTextColor="white"
            onChangeText={(val) => setFName(val)}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <TextInput
            style={[styles.login, styles.loginForm]}
            placeholder="Last Name"
            placeholderTextColor="white"
            onChangeText={(val) => setLName(val)}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <TextInput
            style={[styles.login, styles.loginForm]}
            placeholder="Email"
            placeholderTextColor="white"
            onChangeText={(val) => setEmail(val)}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <TextInput
            style={[styles.login, styles.loginForm]}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="white"
            onChangeText={(val) => setPassword(val)}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <TextInput
            style={[styles.login, styles.loginForm]}
            secureTextEntry={true}
            placeholder="Confirm Password"
            placeholderTextColor="white"
            onChangeText={(val) => setPassword(val)}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginVertical: -90,
          }}
        >
          <Text style={{ color: "white", fontSize: 19 }}>
            {" "}
            Are you an event organizer?{" "}
          </Text>
          <Switch
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            trackColor={{ false: "#767577", true: "#151E3F" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 19 }}> Map View </Text>
          <Switch
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            trackColor={{ false: "#767577", true: "#151E3F" }}
            thumbColor={viewModeListView ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={viewModeSwitch}
            value={viewModeListView}
          />
          <Text style={{ color: "white", fontSize: 19 }}> List View </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Pressable
          style={styles.loginButton}
          onPress={() => {
            handleSignup();
            if (!isEnabled) {
              navigation.navigate("Home");
            } else {
              navigation.navigate("PlannerInfo");
            }
            global.planner = isEnabled;
          }}
        >
          <Text style={{ color: "#7BBA83", fontSize: 24 }}>Register</Text>
        </Pressable>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button title="MapView" onPress={() => navigation.navigate("Home")} />
          <Button
            title="ListView"
            onPress={() => navigation.navigate("ListView")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7BBA83",
    marginTop: -50,
  },
  appTitle: {
    color: "black",
    // fontFamily: "monospace",
    fontSize: 45,
  },
  login: {
    color: "white",
    alignSelf: "center",
  },
  loginForm: {
    width: 200,
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  loginButton: {
    width: 200,
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
