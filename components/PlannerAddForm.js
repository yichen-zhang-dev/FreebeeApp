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
import * as Analytics from 'expo-firebase-analytics';

export default function PlannerAddGiveaway({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  Analytics.setCurrentScreen("Organization Add Giveaway");
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const types = [
    "food",
    "phone accessories",
    "t-shirt",
    "bag",
    "hand-sanitizer",
    "other",
  ];

  const locations = ["CULC", "CRC"];

  const target = ["All students", "CS majors"];

  const [image, setImage] = useState(null);

  const [clubInfo, setClubInfo] = useState("");

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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
              console.log(selectedItem);
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
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
            buttonStyle={{ borderWidth: 1, borderRadius: 8 }}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>
            Date: <Text style={{ color: "red" }}>*</Text>
          </Text>
          <DateTimePicker
            value={date}
            mode={"date"}
            display="default"
            onChange={onChange}
            style={{
              width: 150,
              alignSelf: "center",
              marginLeft: 30,
            }}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>For:</Text>
          <SelectDropdown
            data={target}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
            buttonStyle={{ borderWidth: 1, borderRadius: 8 }}
          />
        </View>
        
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={styles.dropdownTitle}>Photo of Giveaway Item:</Text>
          <Button title="Upload Photo" onPress={PickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <View style={styles.container}>
        <Text style={styles.dropdownTitle}>
            Info about giveaway: <Text style={{ color: "red" }}>*</Text>
          </Text>
        <TextInput style={styles.textForm}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setClubInfo(text)}
            />
        </View>
      </View>
      
      <View style={{ flex: 1 }}>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("PlannerMapView")}
        >
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
  }
});
