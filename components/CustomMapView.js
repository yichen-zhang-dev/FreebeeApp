import React, { useState, Component } from "react";
import { Button, StyleSheet, Text, View, Pressable } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import Header from "./Header";
import * as Location from 'expo-location'

export default class CustomMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      latitude: 0,
      longitude: 0,
      coordinates: [],
      markers: [],
    };
  }

  needsLocationChange(locationSet, loc) {
    for (let loc1 of locationSet) {
      if (
        Math.abs(loc1.longitude - loc.longitude) < 0.00000000000003 &&
        Math.abs(loc1.latitude - loc.latitude) < 0.00000000000003
      ) {
        return true;
      }
    }
    return false;
  }

  populateData() {
    let updatedGiveaways = [];
    this.props.db.collection("giveaways").onSnapshot((querySnapshot) => {
      let locationSet = new Set();
      querySnapshot.forEach((doc) => {
        let loc = doc.data().location;
        while (this.needsLocationChange(locationSet, loc)) {
          loc.longitude +=
            Math.random() * 0.0001 * (Math.random() < 0.5 ? -1 : 1);
          loc.latitude +=
            Math.random() * 0.0001 * (Math.random() < 0.5 ? -1 : 1);
        }
        locationSet.add(loc);
        updatedGiveaways.push({
          id: doc.id,
          type: doc.data().type,
          location: loc,
        });
      });
      this.setState({ markers: updatedGiveaways });
    });
  }

  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 10000,
    };
    this.setState({ ready: false });
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFail, geoOptions);
    this.populateData();
  }
  geoSuccess = (position) => {
    console.log(position);
    this.setState({ready:true});
    this.setState({ latitude: position.coords.latitude });
    this.setState({ longitude: position.coords.longitude });
    console.log(this.state.latitude);
  };
  geoFail = (error) => {
    console.log(error.code, error.message);
  };

  render() {
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
            showsUserLocation={true}
            initialRegion={{
              latitude: 33.77465054971255,
              longitude: -84.39637973754529,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            // onPress={(event) => this.addMarker(event.nativeEvent)}
          >
            {this.state.markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.location.latitude,
                  longitude: marker.location.longitude,
                }}
                title={"GT event "}
              >
                <Callout>
                  <View style={{ flex: 1 }}>
                    <Text style={{ alignSelf: "center" }}>GT event</Text>
                    <Text>ID: {marker.id}</Text>
                    <Text>Type: {marker.type}</Text>
                  </View>
                </Callout>
              </Marker>
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
