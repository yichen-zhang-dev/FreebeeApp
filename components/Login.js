import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faMap, faUsser } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
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
          Log In
        </Text>
        <Text style={[styles.login, { fontSize: 16, marginBottom: 15 }]}>
          DON'T HAVE AN ACOUNT?{" "}
          <Text style={{ textDecorationLine: "underline" }}>SIGN UP</Text>
        </Text>
        <TextInput
          style={[styles.login, styles.loginForm]}
          defaultValue="Username/Email"
        />
        <TextInput
          style={[styles.login, styles.loginForm]}
          defaultValue="Password"
        />
      </View>
      <View style={{ flex: 1 }}>
        <Pressable style={styles.loginButton}>
          <Text style={{ color: "#7BBA83", fontSize: 24 }}>Log in</Text>
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
    fontFamily: "monospace",
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
