import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Header from "./Header";

import * as Analytics from "expo-firebase-analytics";
import { login_uid } from "./Login.js";
import { signup_uid } from "./SignUp.js";

export default function AddSubmission({ navigation, db }) {
  Analytics.setCurrentScreen("User Add Submission");

  const [points, setPoints] = useState(0);

  useEffect(() => {
    let curr_points;
    if (login_uid != undefined) {
      db.collection("userprofile")
        .doc(login_uid)
        .get()
        .then((doc) => {
          curr_points = doc.data().points;
          setPoints(curr_points);
        });
    }
    if (signup_uid != undefined) {
      db.collection("userprofile")
        .doc(signup_uid)
        .get()
        .then((doc) => {
          curr_points = doc.data().points;
          setPoints(curr_points);
        });
    }
  });

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ flex: 6, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 20 }}>
            THANK YOU FOR POSTING A GIVEAWAY.
          </Text>
        </View>
        <View style={{ flex: 2, justifyContent: "flex-start" }}>
          <Text style={styles.scoreText}>YOU WON 5 POINTS</Text>
          <Text style={styles.scoreText}>YOUR CURRENT SCORE: {points}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            width: 200,
          }}
        >
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("MapView")}
          >
            <Text style={styles.buttonText}>Home</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 16,
  },
  button: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#7BBA83",
    borderRadius: 8,
    marginHorizontal: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    paddingVertical: 12,
  },
});
