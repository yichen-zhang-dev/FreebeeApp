import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Header from "./Header";

import { login_uid } from "./Login.js";
import { signup_uid } from "./SignUp.js";

export default function UserProfile({ navigation, db }) {
  const [points, setPoints] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    getPointsAndName();
  });

  async function getPointsAndName() {
    if (login_uid != undefined) {
      const userprofiledoc = await db
        .collection("userprofile")
        .doc(login_uid)
        .get();
      const curr_points = userprofiledoc.data().points;
      setPoints(curr_points);
      setFirstName(userprofiledoc.data().first_name);
    }
    if (signup_uid != undefined) {
      const userprofiledoc = await db
        .collection("userprofile")
        .doc(signup_uid)
        .get();
      const curr_points = userprofiledoc.data().points;
      setPoints(curr_points);
      setFirstName(userprofiledoc.data().first_name);
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ flex: 3, alignItems: "center" }}>
        <Text style={{ fontSize: 24, paddingBottom: 10 }}>
          Hi {firstName + "!"}
        </Text>
        <Text style={{ fontSize: 16, paddingBottom: 10 }}>
          {"Your current points: " + points + "pt"}
        </Text>
        <View style={{ flex: 1, justifyContent: "flex-start", paddingTop: 20 }}>
          <Button
            title="Sign out"
            onPress={() => navigation.navigate("Login")}
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
  },
});
