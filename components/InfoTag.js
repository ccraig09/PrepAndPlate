import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export const InfoTag = ({ name, color, text }) => {
  function camelCaseToNormalText(text) {
    return text
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  }

  const normalText = camelCaseToNormalText(text);

  return (
    <View style={styles.container}>
      <View style={styles.contentRow}>
        <Text style={styles.text}>{normalText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 30,
    alignSelf: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  contentRow: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#7f8082",
    fontWeight: "bold",
  },
});
