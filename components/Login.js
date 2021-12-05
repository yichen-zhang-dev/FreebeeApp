import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Button,
  Modal,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faMap, faUser } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "react-native-toast-notifications";

import firebase from "firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();

  function handleLogin() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.show("User not found", {
          type: "danger",
          placement: "bottom",
          duration: 500,
          offset: 0,
          animationType: "slide-in",
        });
      });
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.setModalVisible(!modalVisible);
        }}
      ></Modal>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text style={styles.appTitle}>FREEBEE</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <FontAwesomeIcon icon={faMap} size={96} />
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text style={[styles.login, { fontSize: 30, marginBottom: 15 }]}>
          Log In
        </Text>
        <Text style={[styles.login, { fontSize: 16, marginBottom: 15 }]}>
          DON'T HAVE AN ACOUNT?{" "}
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ textDecorationLine: "underline" }}>SIGN UP</Text>
          </Pressable>
        </Text>
        <TextInput
          style={[styles.login, styles.loginForm]}
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={(val) => setEmail(val)}
          autoCorrect={false}
          autoCapitalize={"none"}
        />
        <TextInput
          style={[styles.login, styles.loginForm]}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="white"
          onChangeText={(val) => setPassword(val)}
          autoCorrect={false}
          autoCapitalize={"none"}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={{ color: "#7BBA83", fontSize: 24 }}>Log in</Text>
        </Pressable>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button title="MapView" onPress={() => navigation.navigate("Home")} />
        </View>
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
    backgroundColor: "#7BBA83",
  },
  appTitle: {
    color: "black",
    // fontFamily: "monospace",
    fontSize: 45,
  },
  login: {
    color: "white",
    alignSelf: "center",
  },
  loginForm: {
    width: 230,
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  loginButton: {
    width: 200,
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
