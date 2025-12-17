import React from "react";
import { View, StyleSheet } from "react-native";
import List from "./Screens/List";

export default function App() {
  return (
    <View style={styles.container}>
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});
