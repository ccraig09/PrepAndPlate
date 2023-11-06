import React from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";

const IngredientsList = ({ ingredients }) => {
  const baseImageUrl = "https://spoonacular.com/cdn/ingredients_500x500/";
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientItem}>
          <View style={styles.image}>
            <Image
              source={{ uri: baseImageUrl + ingredient.image }}
              style={styles.ingredientImage}
            />
          </View>
          <Text style={styles.ingredientName}>{ingredient.name}</Text>
          <Text style={styles.ingredientAmount}>
            {ingredient.amount.toFixed(0)} {ingredient.unit}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },

  ingredientItem: {
    marginRight: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  ingredientImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },

  ingredientAmount: {
    fontSize: 14,
  },
});

export default IngredientsList;
