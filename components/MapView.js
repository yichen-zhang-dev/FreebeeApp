import React from "react";
import { Button, StyleSheet, Text, View, Pressable } from "react-native";
import Header from "./Header";

export default function MapView({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <View
        style={{
          flex: 5,
          justifyContent: "center",
          backgroundColor: "gray",
          width: "100%",
        }}
      ></View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 24,
        }}
      >
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("AddForm")}
        >
          <Text style={styles.buttonText}>Add Giveaway</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Remove Giveaway</Text>
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
  },
  button: {
    flex: 1,
    justifyContent: "center",
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
