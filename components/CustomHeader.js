import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomHeader = ({ title, onLeftButtonPress, onRightButtonPress }) => {
  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity onPress={onLeftButtonPress}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onRightButtonPress}>
        <Icon name="chevron-right" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: "15%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#008080",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});
// Emerald Green (#2ecc71): This is a bright and vibrant green that can give your app a fresh and energetic feel.

// Matcha Green (#8bd060): Inspired by matcha tea, this green color signifies natural and organic choices.

// Kiwi Green (#8ee53f): A vibrant and juicy green that suggests vitality and energy.

// Spinach Green (#4caf50): A shade of green that is associated with health and well-being.

export default CustomHeader;
