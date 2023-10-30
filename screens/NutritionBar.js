import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NutritionBar = ({ protein, fat, netCarbs }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Protein</Text>
        <Text style={styles.item}>{protein}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Fat</Text>
        <Text style={styles.item}>{fat}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Net Carbs</Text>
        <Text style={styles.item}>{netCarbs}</Text>
      </View>
    </View>
  );
};

export default NutritionBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  section: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "grey",
  },
  item: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
});
