import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMap, faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function Header({ ranking = false, navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={styles.appTitle}>
        FREEBEE
        <FontAwesomeIcon style={{ marginLeft: 24 }} icon={faMap} size={42} />
        {ranking && (
          <Pressable onPress={() => navigation.navigate("Ranking")}>
            <FontAwesomeIcon icon={faTrophy} size={30} color={"#7BBA83"} />
          </Pressable>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    color: "black",
    fontSize: 45,
  },
});
