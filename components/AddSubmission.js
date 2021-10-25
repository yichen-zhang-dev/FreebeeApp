import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Header from "./Header";

export default function AddSubmission({ navigation }) {
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
          <Text style={styles.scoreText}>YOU WIN 5 POINTS</Text>
          <Text style={styles.scoreText}>YOUR CURRENT SCORE: 25</Text>
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
