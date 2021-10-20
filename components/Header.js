import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Text style={styles.appTitle}>
        FREEBEE
        <FontAwesomeIcon style={{ marginLeft: 24 }} icon={faMap} size={42} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    color: "black",
    // fontFamily: "monospace",
    fontSize: 45,
  },
});
