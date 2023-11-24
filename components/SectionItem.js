import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const SectionItem = ({ item, onPress }) => {
  const route = useRoute();
  console.log(">>>route", route);

  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <View>
        <Image style={styles.image} source={{ uri: item.imageUrl }} />
      </View>
      <View style={styles.details}>
        <Text style={styles.timeOfDay}>{item.timeOfDay}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.itemRow}>
          <View style={styles.prepTimeContainer}>
            <MaterialIcons
              name="access-time"
              size={16}
              color={Colors.primary}
            />
            <Text style={styles.prepTime}>
              {item.mealData[0].readyInMinutes} min
            </Text>
          </View>
          <View style={styles.servingSizeContainer}>
            <MaterialIcons name="people-alt" size={16} color={Colors.primary} />
            <Text style={styles.servingSize}>
              {item.mealData[0].servings} servings
            </Text>
          </View>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        ></View>
      </View>
    </TouchableOpacity>
  );
};

export default SectionItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  image: {
    width: 100,
    height: 100,
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  timeOfDay: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#7eb0b7",
  },
  title: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  calories: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 5,
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  servingSizeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  servingSize: {
    fontSize: 14,
    marginLeft: 5,
    color: Colors.primary,
  },
  prepTime: {
    fontSize: 14,
    marginLeft: 5,
    color: Colors.primary,
  },
  prepTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
