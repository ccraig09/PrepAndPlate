import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const InstructionSteps = ({ steps }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef();

  useEffect(() => {
    flatListRef.current.scrollToIndex({ index: currentPage, animated: true });
  }, [currentPage]);

  const renderStep = ({ item, index }) => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>Step {item.number}:</Text>
        <Text style={styles.stepText}>{item.step}</Text>

        <Text style={styles.subTitle}>Items Needed:</Text>
        {item.ingredients.length > 0 ? (
          <View style={styles.ingredientContainer}>
            {item.ingredients.map((ingredient) => (
              <View key={ingredient.name} style={styles.ingredientItem}>
                <Image
                  source={{
                    uri: `https://spoonacular.com/cdn/ingredients_500x500/${ingredient.image}`,
                  }}
                  style={styles.ingredientImage}
                />
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noItemsText}>No items needed.</Text>
        )}

        <Text style={styles.subTitle}>Equipment Needed:</Text>
        {item.equipment.length > 0 ? (
          <View style={styles.equipmentContainer}>
            {item.equipment.map((equipment) => (
              <View key={equipment.name} style={styles.equipmentItem}>
                <Image
                  source={{
                    uri: `https://spoonacular.com/cdn/equipment_500x500/${equipment.image}`,
                  }}
                  style={styles.equipmentImage}
                />
                <Text style={styles.equipmentName}>{equipment.name}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noItemsText}>No equipment needed.</Text>
        )}
      </View>
    );
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={steps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderStep}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const page = Math.round(
            event.nativeEvent.contentOffset.x / Dimensions.get("window").width
          );
          setCurrentPage(page);
        }}
        ref={flatListRef}
      />
      <View style={styles.pageIndicator}>
        {steps.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.pageIndicatorDot,
              index === currentPage && styles.currentPageIndicatorDot,
            ]}
            onPress={() => goToPage(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    width: Dimensions.get("window").width,
    padding: 10,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stepText: {
    fontSize: 16,
    marginVertical: 5,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  ingredientContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  ingredientItem: {
    width: "50%",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  ingredientImage: {
    width: 50, // Adjust the size as needed
    height: 50, // Adjust the size as needed
    borderRadius: 25, // Round the corners
  },
  ingredientName: {
    marginTop: 5,
    textAlign: "center",
  },
  equipmentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  equipmentItem: {
    width: "50%",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  equipmentImage: {
    width: 50, // Adjust the size as needed
    height: 50, // Adjust the size as needed
    borderRadius: 25, // Round the corners
  },
  equipmentName: {
    marginTop: 5,
    textAlign: "center",
  },
  pageIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  pageIndicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "gray",
    marginHorizontal: 5,
  },
  currentPageIndicatorDot: {
    backgroundColor: "black",
  },
  noItemsText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default InstructionSteps;
