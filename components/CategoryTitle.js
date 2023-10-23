import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const CategoryTitle = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.title}>{title}</Text>
      {onPress && <Entypo name="chevron-small-right" size={24} color="black" />}
    </TouchableOpacity>
  );
};

export default CategoryTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
