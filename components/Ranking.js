import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function Ranking() {
  const fakeUsers = [
    { name: "Jonathon Reyna" },
    { name: "Beulah Hail" },
    { name: "Lianne Dodd" },
    { name: "Deanne Dillon" },
    { name: "Ruth Benitez" },
    { name: "Tolga Worthington" },
    { name: "Eleni Cross" },
    { name: "Baran Salazar" },
    { name: "Viktor Ray" },
    { name: "Romany Mccaffrey" },
    { name: "Gladys Read" },
    { name: "Franco Mora" },
    { name: "Syeda Porter" },
    { name: "Haiden Wallis" },
    { name: "Eren Barr" },
    { name: "Elisha Mcgee" },
    { name: "Curtis Bush" },
    { name: "Charlotte Cameron" },
    { name: "Mina Holder" },
    { name: "Areeb Gomez" },
  ];

  const renderUser = (user) => {
    const colors = ["#0e7049", "#3c8a5d", "#60a472", "#7BBA83"];
    const color = user.index < 3 ? colors[user.index] : colors[3];
    return (
      <TouchableOpacity style={[styles.listItem, { backgroundColor: color }]}>
        <Text style={styles.userTitle}>
          {user.index + 1 + "." + user.item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}>
        <Text style={{ fontSize: 45 }}>LEADERBOARD</Text>
      </View>
      <View style={{ flex: 6 }}>
        <FlatList
          data={fakeUsers}
          renderItem={renderUser}
          keyExtractor={(user) => user.name}
        />
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
  listItem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  userTitle: {
    fontSize: 24,
    color: "white",
  },
});
