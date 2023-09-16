import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";

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
    backgroundColor: Colors.primary,
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

export default CustomHeader;
