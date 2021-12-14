import React, { Component } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Analytics from "expo-firebase-analytics";
import Header from "./Header";
import * as Location from "expo-location";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

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

  async populateData() {
    let geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 10000,
    };
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFail,
      geoOptions
    );
    this.props.db.collection("giveaways").onSnapshot((querySnapshot) => {
      let locationSet = new Set();
      let count = 0;
      this.setState({ markers: [] });
      querySnapshot.forEach((doc) => {
        count += 1;
        let loc = doc.data().location;
        while (this.needsLocationChange(locationSet, loc)) {
          loc.longitude +=
            Math.random() * 0.0001 * (Math.random() < 0.5 ? -1 : 1);
          loc.latitude +=
            Math.random() * 0.0001 * (Math.random() < 0.5 ? -1 : 1);
        }
        locationSet.add(loc);
        this.setState({
          markers: [
            ...this.state.markers,
            {
              id: doc.id,
              type: doc.data().type,
              location: loc,
              org: doc.data().organization,
              date: doc.data().date,
              startTime: doc.data().startTime,
              endTime: doc.data().endTime,
            },
          ],
        });
      });
    });
  }

  geoSuccess = (position) => {
    this.setState({ ready: true });
    this.setState({ latitude: position.coords.latitude });
    this.setState({ longitude: position.coords.longitude });
  };

  geoFail = (error) => {
    console.log(error.code, error.message);
  };

  componentDidMount() {
    this.setState({ ready: false });
    this.populateData();
    // Analytics.setCurrentScreen("Custom Map View");
    // Analytics.logEvent("MapView");
  }

  geoSuccess = (position) => {
    this.setState({ ready: true });
    this.setState({ latitude: position.coords.latitude });
    this.setState({ longitude: position.coords.longitude });
  };
  geoFail = (error) => {
    console.log(error.code, error.message);
  };

  handleRemove = (id) => {
    this.props.db
      .collection("giveaways")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    alert("Removing Giveaway");
  };

  goToMyLoc = () => {
    let myLoc = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    if (this.state.latitude !== 0) this.mapView.animateToRegion(myLoc, 2000);
  };

  render() {
    const dateText = (marker) => {
      if (typeof marker.startTime !== "undefined") {
        if (
          typeof marker.endTime !== "undefined" ? marker.endTime !== null : null
        ) {
          return (
            <View>
              <Text>
                {"date: " +
                  new Date(marker.startTime.seconds * 1000).toDateString()}
                {"\nstart time: " +
                  new Date(
                    marker.startTime.seconds * 1000
                  ).toLocaleTimeString()}
                {"\nend time: " +
                  new Date(marker.endTime.seconds * 1000).toLocaleTimeString()}
              </Text>
            </View>
          );
        } else {
          return (
            <Text>
              {"date: " +
                new Date(marker.startTime.seconds * 1000).toDateString()}
              {"\nstart time: " +
                new Date(marker.startTime.seconds * 1000).toLocaleTimeString()}
            </Text>
          );
          // }
        }
      } else {
        return (
          <Text>
            {"date: " + new Date(marker.date.seconds * 1000).toDateString()}
            {"\ntime: " +
              new Date(marker.date.seconds * 1000).toLocaleTimeString()}
          </Text>
        );
      }
    };

    return (
      <View style={styles.container}>
        <Header ranking={false} navigation={this.props.navigation} />
        <View
          style={{
            flex: 5,
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* <DrawerNavigation /> */}
          <MapView
            style={{ ...StyleSheet.absoluteFillObject }}
            showsUserLocation={true}
            ref={(ref) => (this.mapView = ref)}
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
                    <Text style={{ alignSelf: "center" }}>{marker.org}</Text>
                    <Text>{marker.type}</Text>

                    {dateText(marker)}
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => this.handleRemove(marker.id)}
                    >
                      <Text style={styles.removeButtonText}>
                        Remove Giveaway
                      </Text>
                    </Pressable>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <View
            style={{ paddingTop: 500, marginLeft: 325, position: "absolute" }}
          >
            <Pressable onPress={this.goToMyLoc} color="black">
              <FontAwesomeIcon
                icon={faLocationArrow}
                size={30}
                color="#1a73e8"
              />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 24,
          }}
        >
          <Pressable
            style={styles.button}
            onPress={() => this.props.navigation.navigate("AddGiveawayMapView")}
          >
            <Text style={styles.buttonText}>Add Giveaway</Text>
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
  removeButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7BBA83",
    borderRadius: 8,
    width: 150,
    alignSelf: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 16,
    paddingVertical: 12,
  },
});
