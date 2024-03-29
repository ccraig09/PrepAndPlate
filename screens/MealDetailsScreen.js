import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FAB } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/Colors";
import { InfoTag } from "../components/InfoTag";
import MealScheduleModal from "../components/MealScheduleModal";
import * as mealAction from "../redux/actions/mealsAction";
import CategoryTitle from "../components/CategoryTitle";
import NutritionBar from "./NutritionBar";
import IngredientsList from "../components/IngredientsList";
import { useGenerateImageUrl } from "../hooks/useGenerateImageUrl";
import InstructionSteps from "../components/InstructionSteps";

const MealDetailsScreen = (props) => {
  const { mealId } = props.route.params;
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [meal, setMeal] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [trueTagValues, setTrueTagValues] = useState({});

  const [isModalVisible, setModalVisible] = useState(false);

  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const keysToCompare = [
    "vegetarian",
    "vegan",
    "glutenFree",
    "dairyFree",
    "veryHealthy",
    "cheap",
    "veryPopular",
    "sustainable",
    "lowFodmap",
  ];
  const matchingValues = {};
  const matchingObject = meal;

  const nutrition = meal?.nutrition?.nutrients;
  const calories = nutrition?.[0]?.amount?.toFixed(0);
  const fat = nutrition?.[1]?.amount?.toFixed(0);
  const netCarbs = nutrition?.[4]?.amount?.toFixed(0);
  const protein = nutrition?.[8]?.amount?.toFixed(0);
  const image = useGenerateImageUrl(meal?.id, meal?.imageType, "480x360");

  const handleScheduleMeal = async (selectedDate, timeOfDay) => {
    setIsLoading(true);

    const mealToSchedule = {
      mealId: meal.id,
      title: meal.title,
      imageUrl: meal.image,
      mealData: meal,
      date: selectedDate,
      timeOfDay: timeOfDay,
    };

    await dispatch(mealAction.addMeal(mealToSchedule))
      .then(() => {
        setIsLoading(false);
        Alert.alert("Created Successfully");
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert("An error occured. Try again", [{ text: "OK" }]);
      });
    setModalVisible(false);
  };

  const loadMeal = async () => {
    setIsLoading(true);
    try {
      await dispatch(mealAction.getMealById(mealId)).then((res) => {
        setMeal(res);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const compareKeys = () => {
    keysToCompare.forEach((key) => {
      if (matchingObject[key] === true) {
        matchingValues[key] = true;
      }
    });
    setTrueTagValues(matchingValues);
    console.log(">>>>>matchingValues", matchingValues);
  };

  useEffect(() => {
    loadMeal();
    compareKeys();
  }, []);

  const Tags = () => {
    return (
      <View style={styles.infoTagContainer}>
        {Object.keys(trueTagValues).map((key, index) => (
          <View key={index}>
            <InfoTag text={key} />
          </View>
        ))}
      </View>
    );
  };

  const Divider = () => {
    return (
      <View
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 0.2,
          marginVertical: 10,
          marginHorizontal: 16,
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.heading}>
          <Text style={styles.title}>{meal.title}</Text>
        </View>
        <View style={styles.infoBar}>
          <Text style={styles.infoBarText}>
            {meal.readyInMinutes} min {"\u2022"} {calories} calories
          </Text>
        </View>
        <Tags />
        <CategoryTitle
          title={"Nutrition Info"}
          onPress={() =>
            navigation.navigate("Nutrition", {
              nutritionData: nutrition,
              calories: calories,
            })
          }
        />
        <NutritionBar protein={protein} fat={fat} netCarbs={netCarbs} />
        <Divider />
        <CategoryTitle title={"Ingredients"} />
        <IngredientsList ingredients={meal?.extendedIngredients} />
        <Divider />
        <Divider />
        <CategoryTitle title={"Instructions"} />
        <InstructionSteps steps={meal?.analyzedInstructions[0]?.steps} />
        <MealScheduleModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSchedule={handleScheduleMeal}
        />
      </ScrollView>

      <FAB.Group
        open={open}
        icon={open ? "close" : "plus"}
        color={"white"}
        fabStyle={{ backgroundColor: Colors.primary }}
        actions={[
          {
            icon: "plus",
            label: "Add to favorites",
            color: "white",
            style: { backgroundColor: Colors.secondary },
            onPress: () => console.log("Pressed add"),
          },
          {
            icon: "calendar-today",
            label: "Add to calendar",
            style: { backgroundColor: Colors.secondary },
            color: "white",
            onPress: () => setModalVisible(true),
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
      />
    </View>
  );
};

export default MealDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  heading: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  infoBar: {
    marginHorizontal: 20,
  },
  infoBarText: {
    fontSize: 16,
    color: "gray",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  image: {
    width: "100%",
    height: 300,
  },

  infoTagContainer: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    // marginHorizontal: 20,
    marginVertical: 10,
  },
  instructions: {
    flex: 1,
    // fontSize: 30,
    // height: 200,
  },
  group: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    // flexDirection: "row",
  },
  label: {
    fontSize: 18,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
