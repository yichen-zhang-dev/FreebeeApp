import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Analytics from "expo-firebase-analytics";

export default function Ranking({ db }) {
  const [users, setUsers] = useState({});
  Analytics.setCurrentScreen("User Ranking");
  Analytics.logEvent("Viewing leaderboard");
  useEffect(() => {
    db.collection("userprofile").onSnapshot((querySnapshot) => {
      let topUsers = [];
      querySnapshot.forEach((doc) => {
        let name = doc.data().first_name + " " + doc.data().last_name;
        let points = doc.data().points;
        topUsers.push({ name: name, points: points });
      });
      topUsers = topUsers.filter(function (user) {
        return !isNaN(user.points);
      });
      topUsers.sort(function (a, b) {
        return b.points - a.points;
      });
      setUsers(topUsers);
    });
  }, []);

  const renderUser = (user) => {
    
    const colors = ["#0e7049", "#3c8a5d", "#60a472", "#7BBA83"];
    const color = user.index < 3 ? colors[user.index] : colors[3];
    return (
      <TouchableOpacity
        style={[
          styles.listItem,
          { flex: 1, flexDirection: "row", backgroundColor: color },
        ]}
      >
        <Text style={styles.userName}>
          {user.index + 1 + ". " + user.item.name}
        </Text>
        <View style={{ alignItems: "flex-end", flex: 1 }}>
          <Text style={styles.userPoints}>{user.item.points + "pt"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}>
        <Text style={{ fontSize: 45 }}>LEADERBOARD</Text>
      </View>
      <View style={{ flex: 8 }}>
        <FlatList
          data={users}
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
    width: 300,

    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  userName: {
    flex: 4,
    fontSize: 20,
    color: "white",
  },
  userPoints: {
    flex: 1,
    fontSize: 20,
    color: "white",
  },
});
