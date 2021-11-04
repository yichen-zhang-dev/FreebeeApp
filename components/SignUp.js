import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Button,
  Switch
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faMap, faUser } from "@fortawesome/free-solid-svg-icons";

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text style={styles.appTitle}>FREEBEE</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <FontAwesomeIcon icon={faMap} size={96} />
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
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
          placeholder="Username/Email"
          placeholderTextColor="white"
          onChangeText={(val) => setUsername(val)}
        />
        <TextInput
          style={[styles.login, styles.loginForm]}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="white"
          onChangeText={(val) => setPassword(val)}
        />
        <TextInput
          style={[styles.login, styles.loginForm]}
          secureTextEntry={true}
          placeholder="Confirm Password"
          placeholderTextColor="white"
          onChangeText={(val) => setPassword(val)}
        />
        <Text style={{ color: "white", fontSize: 18 }}> Are you an event organizer? </Text>
        <Switch
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
      <View style={{ flex: 1 }}>
        <Pressable
          style={styles.loginButton}
          onPress={() => {if (!isEnabled) {navigation.navigate("MapView")} else {navigation.navigate("PlannerInfo")}}}
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
          <Button
            title="MapView"
            onPress={() => navigation.navigate("MapView")}
          />
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
