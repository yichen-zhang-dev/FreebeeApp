import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Header from "./Header";

import { login_uid } from "./Login.js";
import { signup_uid } from "./SignUp.js";

export default function UserProfile({ navigation, db }) {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    getPoints();
  });

  async function getPoints() { 
    if (login_uid != undefined) {
      const userprofiledoc = await db.collection("userprofile").doc(login_uid).get();
      const curr_points = userprofiledoc.data().points;
      setPoints(curr_points);
    }
    if (signup_uid != undefined) {
      const userprofiledoc = await db.collection("userprofile").doc(signup_uid).get();
      const curr_points = userprofiledoc.data().points;
      setPoints(curr_points);
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ flex: 3 }}>
        <Text>Hello User Profile!</Text>
        <Text>{"Points: " + points}</Text>
        <Button title="Sign out" onPress={() => navigation.navigate("Login")} />
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
  },
});
