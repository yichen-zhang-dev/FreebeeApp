import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  TouchableHighlight,
} from "react-native";
import Header from "./Header";
import * as Location from "expo-location";
import Swipeout from "react-native-swipeout";
import * as Analytics from "expo-firebase-analytics";

export default class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      latitude: 0,
      longitude: 0,
      coordinates: [],
      giveaways: [],
      loading: true,
    };
    Analytics.setCurrentScreen("ListView");
  }

  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 10000,
    };
    this.setState({ ready: false });

    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFail,
      geoOptions
    );
  }

  geoSuccess = (position) => {
    this.setState({ ready: true });
    this.setState({ latitude: position.coords.latitude });
    this.setState({ longitude: position.coords.longitude });
    this.populateData();
  };

  geoFail = (error) => {
    console.log(error.code, error.message);
  };

  calculateDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  populateData = () => {
    this.props.db.collection("giveaways").onSnapshot((querySnapshot) => {
      let updatedGiveaways = [];
      querySnapshot.forEach((doc) => {
        let loc = doc.data().location;
        let distance = this.calculateDistance(
          this.state.latitude,
          this.state.longitude,
          loc.latitude,
          loc.longitude
        );
        updatedGiveaways.push({
          id: doc.id,
          type: doc.data().type,
          location: loc,
          distance: distance,
          org: doc.data().organization,
        });
      });
      // let sortedGiveaways = this.mergeSort(updatedGiveaways);
      // console.log(sortedGiveaways);
      updatedGiveaways.sort(function (a, b) {
        return a.distance - b.distance;
      });
      updatedGiveaways = updatedGiveaways.filter(
        (giveaway) => giveaway.distance <= 2
      );
      this.setState({ giveaways: updatedGiveaways });
      this.setState({ loading: false });
    });
  };

  // renderData(item) {
  //   let swipeoutBtns = [
  //     {
  //       text: "Remove",
  //       backgroundColor: "red",
  //       underlayColor: "rgba(0, 0, 0, 1, 0.6)",
  //       onPress: () => {
  //         console.log(item);
  //       },
  //     },
  //   ];

  //   return (
  //     <Swipeout right={swipeoutBtns} style={styles.listItem}>
  //       <TouchableHighlight>
  //         <View>
  //           <Text style={styles.itemTitle}>{item.type}</Text>
  //           <View style={{ flex: 1, flexDirection: "row" }}>
  //             <Text style={styles.itemOrg}>{item.org + "\t\t"}</Text>
  //             <Text style={styles.itemDist}>
  //               {"<" +
  //                 parseFloat((item.distance * 0.621371 + 0.01).toFixed(2)) +
  //                 "miles"}
  //             </Text>
  //           </View>
  //         </View>
  //       </TouchableHighlight>
  //     </Swipeout>
  //   );
  // }

  render() {
    renderItem = ({ item }) => {
      let swipeoutBtns = [
        {
          text: "Remove",
          backgroundColor: "red",
          underlayColor: "rgba(0, 0, 0, 1, 0.6)",
          onPress: () => {
            this.props.db
              .collection("giveaways")
              .doc(item.id)
              .delete()
              .then(() => {
                console.log("Document successfully deleted!");
              })
              .catch((error) => {
                console.error("Error removing document: ", error);
              });
          },
        },
      ];
      return (
        <Swipeout right={swipeoutBtns} style={styles.listItem}>
          <TouchableHighlight>
            <View>
              <Text style={styles.itemTitle}>{item.type}</Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={styles.itemOrg}>{item.org + "\t\t"}</Text>
                <Text style={styles.itemDist}>
                  {"<" +
                    parseFloat((item.distance * 0.621371 + 0.01).toFixed(2)) +
                    "miles"}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </Swipeout>
        // <TouchableOpacity style={styles.listItem}>
        //   <Text style={styles.itemTitle}>{item.type}</Text>
        //   <View style={{ flex: 1, flexDirection: "row" }}>
        //     <Text style={styles.itemOrg}>{item.org + "\t\t"}</Text>
        //     <Text style={styles.itemDist}>
        //       {"<" +
        //         parseFloat((item.distance * 0.621371 + 0.01).toFixed(2)) +
        //         "miles"}
        //     </Text>
        //   </View>
        // </TouchableOpacity>
      );
    };
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Header />
          <View style={styles.listContainer}>
            <FlatList data={this.state.giveaways} renderItem={renderItem} />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 24,
            }}
          >
            <Pressable
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("AddGiveawayListView")
              }
            >
              <Text style={styles.buttonText}>Add Giveaway</Text>
            </Pressable>
          </View>
        </View>
      );
    }
  }
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
    backgroundColor: "#60a472",
    // padding: 12,
    paddingHorizontal: 12,
    // paddingVertical: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    width: 300,
    //
  },
  itemTitle: {
    paddingTop: 10,
    fontSize: 20,
    color: "black",
  },
  itemOrg: {
    flex: 3,
    fontSize: 12,
    color: "white",
  },
  itemDist: {
    flex: 1,
    fontSize: 12,
    color: "white",
    paddingBottom: 10,
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
