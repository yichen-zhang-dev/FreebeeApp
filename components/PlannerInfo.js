import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";

export default function PlannerInfo({ navigation }) {
  const [name, setname] = useState("");
  const [club, setClub] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text style={styles.appTitle}>FREEBEE</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <FontAwesomeIcon icon={faMap} size={96} />
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text style={[styles.login, { fontSize: 30, marginBottom: 0 }]}>
          Event Organizer
        </Text>
        <Text style={[styles.login, { fontSize: 30, marginBottom: 15 }]}>
          Sign Up
        </Text>
        <TextInput
          style={[styles.login, styles.loginForm]}
          placeholder="Club/Org"
          placeholderTextColor="white"
          onChangeText={(val) => setClub(val)}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Pressable
          style={styles.loginButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ color: "#7BBA83", fontSize: 24 }}>Sign Up</Text>
        </Pressable>
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
