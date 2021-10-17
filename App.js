import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    // <View style={styles.container}>
    //   <Text>Hello</Text>
    // </View>
    <Login />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7BBA83',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    backgroundColor: '#7BBA83'
  }
});
