import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

const NutritionFactsScreen = () => {
  const route = useRoute();
  const { nutritionData, calories } = route.params;

  const renderNutritionItem = (label, value, unit, percent, index) => {
    const isBoldText =
      label === "Fat" ||
      label === "Cholesterol" ||
      label === "Sodium" ||
      label === "Protein" ||
      label === "Carbohydrates";

    const proteinIndex = nutritionData.findIndex(
      (item) => item.name === "Protein"
    );

    const isAfterProtein = proteinIndex !== -1 && index > proteinIndex;

    return (
      <View
        style={[
          isBoldText
            ? styles.nutritionItem
            : {
                ...styles.nutritionItem,
                marginLeft: 20,
              },
          isAfterProtein ? styles.noMargin : null,
          isBoldText ? styles.boldText : null,
          index === 0 || index === nutritionData.length - 1
            ? styles.noBottomBorder
            : null,

          label === "Protein" ? styles.thickerBorder : null,
        ]}
        key={label}
      >
        {label === "Calories" ? null : (
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.label, isBoldText ? styles.boldText : null]}>
              {label + " "}
            </Text>
            <Text style={styles.value}>{value}</Text>

            <Text style={styles.label}>{unit}</Text>
          </View>
        )}
        <View>
          {label === "Protein" || label === "Calories" ? null : (
            <Text
              style={[styles.value, !isAfterProtein && { fontWeight: "bold" }]}
            >
              {percent}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Nutrition Facts</Text>
      </View>
      <View
        style={[
          styles.thickerBorder,
          {
            width: "100%",
          },
        ]}
      >
        <View>
          <Text style={{ marginBottom: -5, fontWeight: "bold" }}>
            Amount per serving
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.label, { fontSize: 30, fontWeight: "bold" }]}>
            Calories
          </Text>
          <>
            <Text style={[styles.value, { fontSize: 30, fontWeight: "bold" }]}>
              {calories}
            </Text>
          </>
        </View>
      </View>
      <View style={styles.dailyView}>
        <Text style={styles.daily}>% Daily Value*</Text>
      </View>
      {nutritionData.map((item, index) =>
        renderNutritionItem(
          item.name,
          item.amount.toFixed(0),
          item.unit,
          item.percentOfDailyNeeds.toFixed(0) + "%",
          index
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  thickerBorder: {
    borderBottomWidth: 10,
    borderColor: "black",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  titleContainer: {
    borderBottomWidth: 15,
    borderColor: "black",
    paddingBottom: 10,
  },
  daily: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dailyView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderColor: "black",
  },
  nutritionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  boldText: {
    fontWeight: "bold",
  },
  noBottomBorder: {
    borderBottomWidth: 0,
  },
  noMargin: {
    marginLeft: 0,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
});

export default NutritionFactsScreen;
