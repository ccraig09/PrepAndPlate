import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const SectionItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.item}>
      <View>
        <Text>{item.timeOfDay}</Text>
        <Text>{item.title}</Text>
        <Text>{item.servingSize}</Text>
        <Text>{item.prepTime}</Text>
        <Text>{item.calories} calories</Text>
        <Text>{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SectionItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f7f9f7",
    margin: 10,
    borderRadius: 10,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
