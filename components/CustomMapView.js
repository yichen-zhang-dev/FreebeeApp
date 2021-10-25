import React, { useState, Component } from "react";
import { Button, StyleSheet, Text, View, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Header from "./Header";
import { firebase } from "firebase";
import { getDatabase, ref, onValue } from "firebase/database";

export default class CustomMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
    };
    const firebaseConfig = {
      apiKey: "AIzaSyDUiwY5rcwqjWZ6OCN7-S9iNvzc-AZxbUI",
      authDomain: "freebeeapp-d0524.firebaseapp.com",
      databaseURL: "https://freebeeapp-d0524.firebaseio.com",
      projectId: "freebeeapp-d0524",
      storageBucket: "freebeeapp-d0524.appspot.com",
      messagingSenderId: "794231349024",
      appId: "1:794231349024:ios:28530a78d30a2a2b220145",
      measurementId: "G-measurement-id",
    };

    // firebase.initializeApp(firebaseConfig);
  }

  // storeHighScore(userId, score) {
  //   const db = getDatabase();
  //   const reference = ref(db, "users/" + userId);
  //   set(ref(db, "users/" + userId), {
  //     highscore: score,
  //   });
  // }

  addMarker(event) {
    // console.log(event.coordinate)
    var coordinates = event.coordinate;
    // console.log("markers", this.state.markers)

    // console.log(event.action)
    if (event.action != "marker-press") {
      this.setState({
        markers: [
          ...this.state.markers,
          { latitude: coordinates.latitude, longitude: coordinates.longitude },
        ],
      });
      console.log(
        this.state.markers.length,
        coordinates.latitude,
        coordinates.longitude
      );
    }
  }

  deleteMarker(coordinates, index) {
    console.log(index, coordinates.latitude, coordinates.longitude, "<Delete>");
    var temp = [...this.state.markers];
    temp.splice(index, 1);
    this.setState({
      markers: temp,
    });
    // console.log("post-delete", this.state.markers)
    // console.log(this.state.markers)
  }

  render() {
    console.log("Refresh");
    return (
      <View style={styles.container}>
        <Header ranking={true} navigation={this.props.navigation} />
        <View
          style={{
            flex: 5,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <MapView
            style={{ ...StyleSheet.absoluteFillObject }}
            initialRegion={{
              latitude: 33.7872131,
              longitude: -84.381931,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            onPress={(event) => this.addMarker(event.nativeEvent)}
          >
            <Marker
              coordinate={{ latitude: 33.7872131, longitude: -84.381931 }}
              title="GT VSA Giveaway"
              description="This is where the magic happens!"
            />

            {this.state.markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onPress={(event) =>
                  this.deleteMarker(event.nativeEvent.coordinate, index)
                }
              />
            ))}
          </MapView>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 24,
          }}
        >
          <Pressable
            style={styles.button}
            onPress={() => this.props.navigation.navigate("AddForm")}
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
