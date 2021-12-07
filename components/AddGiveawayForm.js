import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "./Header";
import * as ImagePicker from "expo-image-picker";
import * as Analytics from "expo-firebase-analytics";
import * as Location from "expo-location";
import firebase from "firebase";
import { login_uid } from "./Login.js";
import { signup_uid } from "./SignUp.js";

export default function AddGiveawayForm({ route, navigation, db }) {
  const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [counter, setCounter] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(null);

  const [giveawayType, setGiveawayType] = useState("");
  const [giveawayLocation, setGiveawayLocation] = useState("");
  const [image, setImage] = useState(null);
  const [clubInfo, setClubInfo] = useState("");

  const [ready, setReady] = useState(false);
  const [currLatitude, setCurrLatitude] = useState(0);
  const [currLongitude, setCurrLongitude] = useState(0);
  const [currCoordinates, setCurrCoordinates] = useState([]);
  const [organization, setOrganization] = useState("GT event");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    tempDate = new Date(currentDate);
    if (mode === "date") {
      setDate(new Date(currentDate));
      showMode("time");
    }
    if (mode === "time" && counter === 0) {
      setCounter(1);
      setStartTime(new Date(selectedDate));
      showMode("time");
    } else if (mode === "time" && counter === 1) {
      setEndTime(new Date(selectedDate));
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
    setCounter(0);
  };

  const showTimepicker = () => {
    showMode("time");
  };

  var uri;

  const types = [
    "food",
    "phone accessories",
    "t-shirt",
    "bag",
    "hand-sanitizer",
    "other",
  ];
  const locations = ["CULC", "CRC", "Your Location"];
  const target = ["All students", "CS majors"];

  Analytics.setCurrentScreen("User Add Giveaway");

  const geoSuccess = (position) => {
    setReady(true);
    setCurrLatitude(position.coords.latitude);
    setCurrLongitude(position.coords.longitude);
  };

  useEffect(() => {
    if (currLatitude !== 0) return;
    let geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 10000,
    };
    setReady(false);
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFail, geoOptions);
  });

  const geoFail = (error) => {
    console.log(error.code, error.message);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uri = result.uri;
      setImage(result.uri);
      this.uploadImage(result.uri, "test-image")
        .then(() => {})
        .catch((error) => {});
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    ref.put(blob);
  };

  async function handleSubmission() {
    if (date < new Date()) {
      console.log("Invalid date!");
    }

    if (giveawayType === "" || giveawayLocation === "") {
      console.log("Empty mandatory fields!");
      return;
    }

    let longitude;
    let latitude;
    if (giveawayLocation === "CULC") {
      latitude = 33.77465054971255;
      longitude = -84.39637973754529;
    } else if (giveawayLocation === "CRC") {
      latitude = 33.77560635846814;
      longitude = -84.40390882992358;
    } else {
      latitude = currLatitude;
      longitude = currLongitude;
    }

    if (latitude == currLatitude) {
      db.collection("giveaways").add({
        type: giveawayType,
        location: { longitude: longitude, latitude: latitude },
        clubInfo: clubInfo,
        startTime: startTime,
        endTime: endTime,
        date: date,
        organization: organization,
      });
    } else {
      console.log("true");
      db.collection("giveaways").add({
        type: giveawayType,
        location: { longitude: longitude, latitude: latitude },
        spot: giveawayLocation,
        clubInfo: clubInfo,
        startTime: startTime,
        endTime: endTime,
        date: date,
        organization: organization,
      });
    }

    var userprofiledoc;
    var curr_points;
    var new_points;
    if (login_uid != undefined) {
      userprofiledoc = await db.collection("userprofile").doc(login_uid).get();
      curr_points = userprofiledoc.data().points;
      new_points = curr_points + 5;
      db.collection("userprofile").doc(login_uid).update({
        points: new_points,
      });
    }
    if (signup_uid != undefined) {
      userprofiledoc = await db.collection("userprofile").doc(signup_uid).get();
      curr_points = userprofiledoc.data().points;
      new_points = curr_points + 5;
      db.collection("userprofile").doc(signup_uid).update({
        points: new_points,
      });
    }

    navigation.navigate("Submission");
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ flex: 5 }}>
        <Text style={{ fontSize: 24, marginVertical: 10 }}>
          Enter giveaway information below
        </Text>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>
            Types of giveaway: <Text style={{ color: "red" }}>*</Text>
          </Text>
          <SelectDropdown
            data={types}
            onSelect={(selectedItem) => {
              setGiveawayType(selectedItem);
              console.log(startTime);
              console.log(endTime);
            }}
            buttonStyle={{ borderWidth: 1, borderRadius: 8 }}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>
            Giveaway Location: <Text style={{ color: "red" }}>*</Text>
          </Text>
          <SelectDropdown
            data={locations}
            onSelect={(loc) => {
              setGiveawayLocation(loc);
            }}
            buttonStyle={{ borderWidth: 1, borderRadius: 8 }}
          />
        </View>
        {global.eventPlanner && (
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownTitle}>
              Date: <Text style={{ color: "red" }}>*</Text>
            </Text>
            <Button onPress={showDatepicker} title="Pick a Date!" />
            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                display="default"
                onChange={onChange}
                style={{
                  width: 150,
                  alignSelf: "center",
                  marginLeft: 30,
                }}
              />
            )}
            {/* <Button onPress={showTimepicker} title="Pick a Time!" />
            {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              display="default"
              onChange={onChange}
              style={{
                width: 150,
                alignSelf: "center",
                marginLeft: 30,
              }}
            /> )} */}
          </View>
        )}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>
            Organization: <Text style={{ color: "red" }}>*</Text>
          </Text>

          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 8,
              width: 200,
              height: 40,
              fontSize: 16,
              textAlign: "center",
            }}
            placeholder="Enter an organization"
            placeholderTextColor="black"
            onChangeText={(val) => setOrganization(val)}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          {/* <SelectDropdown
            data={target}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
            buttonStyle={{ borderWidth: 1, borderRadius: 8 }}
          /> */}
        </View>
        {!global.eventPlanner && (
          <View style={{ flex: 1, alignItems: "center", paddingTop: 13 }}>
            <Text style={styles.dropdownTitle}>Photo of Giveaway Item:</Text>
            <Button title="Upload Photo" onPress={PickImage} />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
        )}
        {global.eventPlanner && (
          <View style={styles.container}>
            <Text style={styles.dropdownTitle}>
              Info about giveaway: <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.textForm}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => setClubInfo(text)}
            />
          </View>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Pressable style={styles.buttonContainer} onPress={handleSubmission}>
          <Text style={styles.buttonText}>Add Giveaway</Text>
        </Pressable>
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
  dropdownContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  dropdownTitle: {
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7BBA83",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 66,
  },
  textForm: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 8,
    width: 300,
    height: 100,
  },
});
