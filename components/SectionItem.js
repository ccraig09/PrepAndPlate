import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
const SectionItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.item}>
      <View>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
      <View style={styles.details}>
        <Text style={styles.timeOfDay}>{item.timeOfDay}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.rating}>
          <Rating
            type="custom"
            imageSize={15}
            ratingCount={5}
            ratingColor={Colors.primary}
            readonly
            startingValue={item.rating}
            tintColor={"#f7f9f7"}
          />
          <View style={styles.caloriesContainer}>
            <MaterialIcons
              name="local-fire-department"
              size={16}
              color={Colors.primary}
            />
            <Text style={styles.calories}>{item.calories} calories</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.servingSizeContainer}>
            <MaterialIcons name="people-alt" size={16} color={Colors.primary} />
            <Text style={styles.servingSize}> {item.servingSize}</Text>
          </View>
          <View style={styles.prepTimeContainer}>
            <MaterialIcons
              name="access-time"
              size={16}
              color={Colors.primary}
            />
            <Text style={styles.prepTime}> {item.prepTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SectionItem;

const styles = StyleSheet.create({
  item: {
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
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  calories: {
    fontSize: 14,
    color: Colors.primary,
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
    color: "black",
  },
  prepTime: {
    fontSize: 14,
    color: "black",
  },
  prepTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
});
