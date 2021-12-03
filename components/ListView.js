import React, { useState , Component} from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Header from "./Header";
import * as Location from 'expo-location'

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
    
  }
  geoSuccess = (position) => {
    this.setState({ready:true});
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
  }

    deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    }
  
    merge = (arr1, arr2) => {
      //make a new array and have two value pointers
      let res = [],
        i = 0,
        j = 0;
      //sorting the first array.
      if (arr1.length > 1) {
        let min = 0;
        for (let i = 0; i < arr1.length; i++) {
          if (i !== min) {
            if (arr1[i].distance < arr1[min].distance) {
              //also swap the elements
              [arr1[i], arr1[min]] = [arr1[min], arr1[i]];
              //change the minimum
              min = i;
            }
          }
        }
      }
      //sorting the second array.
      if (arr2.length > 1) {
        let min = 0;
        for (let i = 0; i < arr2.length; i++) {
          if (i !== min) {
            if (arr2[i].distance < arr2[min].distance) {
              //also swap the elements
              [arr2[i], arr2[min]] = [arr2[min], arr2[i]];
              //change the minimum
              min = i;
            }
          }
        }
      }
      //Value comparison.
      while (i < arr1.length && j < arr2.length) {
        if (arr1[i].distance < arr2[j].distance) {
          res.push(arr1[i]);
          i++;
        } else {
          res.push(arr2[j]);
          j++;
        }
      }
      //pushing the rest of arr1.
      while (i < arr1.length) {
        res.push(arr1[i]);
        i++;
      }
      //pushing the rest of arr2.
      while (j < arr2.length) {
        res.push(arr2[j]);
        j++;
      }
      return res;
    }
    
    //merge sort
    mergeSort = (arr) => {
      //Best case
      if (arr.length <= 1) return arr;
      //splitting into halves
      let mid = Math.ceil(arr.length / 2);
      let arr1 = arr.slice(0, mid);
      let arr2 = arr.slice(mid);
      let arr1_subarrays = [],
        sorted_arr1_subarrays = [];
      let arr2_subarrays = [],
        sorted_arr2_subarrays = [];
      //loop through array 1 making subarrays of two elements
      for (let i = 0; i < arr1.length; i += 2) {
        arr1_subarrays.push(arr1.slice(i, i + 2));
      }
      //loop through array 2 making subarrays of two elements.
      for (let i = 0; i < arr2.length; i += 2) {
        arr2_subarrays.push(arr2.slice(i, i + 2));
      }
      // sorting each subarray of arr1.
      for (let i = 0; i < arr1_subarrays.length; i += 2) {
        let result = this.merge(arr1_subarrays[i], arr1_subarrays[i + 1]);
        result.forEach((value) => sorted_arr1_subarrays.push(value));
      }
      // sorting each subarray of arr2.
      for (let i = 0; i < arr2_subarrays.length; i += 2) {
        let result = this.merge(arr2_subarrays[i], arr2_subarrays[i + 1]);
        result.forEach((value) => sorted_arr2_subarrays.push(value));
      }
      let result = this.merge(sorted_arr1_subarrays, sorted_arr2_subarrays);
      return result;
    }
    
  
  populateData = () => {
    let updatedGiveaways = [];
    this.props.db.collection("giveaways").onSnapshot((querySnapshot) => {
      let locationSet = new Set();
      querySnapshot.forEach((doc) => {
        let loc = doc.data().location;
        let distance = this.calculateDistance(this.state.latitude, this.state.longitude, loc.latitude, loc.longitude);
        locationSet.add(loc);
        updatedGiveaways.push({
          id: doc.id,
          type: doc.data().type,
          location: loc,
          distance: distance,
        });
      });
      let sortedGiveaways = this.mergeSort(updatedGiveaways);
      this.setState({ giveaways: sortedGiveaways });
      this.setState({loading:false});
    });
  };

  
  render() {
    renderItem = ({ item }) => {
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
    color: "black",
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
