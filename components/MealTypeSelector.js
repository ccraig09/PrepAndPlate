import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import Colors from "../constants/Colors";

const MealTypeSelector = ({ onTypeSelect }) => {
  const [selectedType, setSelectedType] = useState(null);
  const timeOfDay = ["Breakfast", "Snack", "Lunch", "Dinner"];

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    onTypeSelect(timeOfDay[type]);
  };

  return (
    <View style={styles.container}>
      <ButtonGroup
        buttons={timeOfDay}
        selectedIndex={selectedType}
        onPress={(value) => {
          handleTypeSelect(value);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#3498db",
  },
  selectedButton: {
    backgroundColor: Colors.primary,
    borderColor: "#fff",
  },
});

export default MealTypeSelector;
