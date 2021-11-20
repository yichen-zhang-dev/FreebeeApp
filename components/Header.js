import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMap, faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function Header({ ranking = false, navigation }) {
  return (
    <View
      style={{
        flex: 0.6,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.appTitle}>FREEBEE</Text>
      <FontAwesomeIcon
        style={{ marginLeft: 24, marginTop: 5 }}
        icon={faMap}
        size={42}
      />
      {ranking && (
        <Pressable
          style={{ marginLeft: 20, marginTop: 10 }}
          onPress={() => navigation.navigate("Ranking")}
        >
          <FontAwesomeIcon icon={faTrophy} size={30} color={"#7BBA83"} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    color: "black",
    fontSize: 45,
  },
});
