import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "./Header";

import * as Analytics from 'expo-firebase-analytics';

export default function ListView() {
  Analytics.setCurrentScreen("ListView");
  const data = [
    {
      type: "food",
      location: "CULC",
      organization: "GT WebDev",
      startTime: "10:00",
      endTime: "10:30",
    },
    {
      type: "t-shirt",
      location: "CRC",
      organization: "iOS Club",
      startTime: "12:00",
      endTime: "14:00",
    },
    {
      type: "t-shirt",
      location: "CRC",
      organization: "iOS Club",
      startTime: "12:00",
      endTime: "14:00",
    },
    {
      type: "t-shirt",
      location: "CRC",
      organization: "iOS Club",
      startTime: "12:00",
      endTime: "14:00",
    },
    {
      type: "t-shirt",
      location: "CRC",
      organization: "iOS Club",
      startTime: "12:00",
      endTime: "14:00",
    },
    {
      type: "t-shirt",
      location: "CRC",
      organization: "iOS Club",
      startTime: "12:00",
      endTime: "14:00",
    },
    {
      type: "t-shirt",
      location: "CRC",
      organization: "iOS Club",
      startTime: "12:00",
      endTime: "14:00",
    },
  ];

  const [giveaways, setGiveaways] = useState({});

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.itemTitle}>
          {item.organization}
          {"\t\t"}
          {item.type}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.listContainer}>
        <FlatList data={data} renderItem={renderItem} />
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
  listContainer: {
    flex: 5,
  },
  listItem: {
    backgroundColor: "#7BBA83",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemTitle: {
    fontSize: 32,
    color: "white",
  },
});
