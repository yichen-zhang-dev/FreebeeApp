import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Header from "./Header";

export default function UserProfile({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={{ flex: 3 }}>
        <Text>Hello User Profile!</Text>
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
