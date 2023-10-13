import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";

import { InfoTag } from "../components/InfoTag";

const MealDetailsScreen = (props) => {
  const { mealId } = props.route.params;
  const layout = useWindowDimensions();
  const tagValues = [
    {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      veryHealthy: true,
      cheap: true,
      veryPopular: true,
      sustainable: true,
      lowFodmap: true,
    },
  ];

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Instructions" },
    { key: "second", title: "Ingredients" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: "green" }}
    />
  );

  const meal = useSelector((state) =>
    state.meals.searchResults.find((meal) => meal.id == mealId)
  );

  const mealArrays = useSelector((state) => state.meals.searchResults);

  // useEffect(() => {
  //   const filteredArray = filterArrayWithArray(meal, tagValues, keysToCompare);
  //   console.log(filteredArray);
  // }, []);

  // console.log(">>>>>meal", mealArrays);
  const nutrition = meal.nutrition.nutrients;
  const calories = nutrition[0].amount.toFixed(0);

  function filterArrayWithArray(mainArray, filterArray, keys) {
    // console.log(">>>filteredArray", filterArray);
    return mainArray.filter((mainObj) => {
      // console.log(">>>>mainObj", mainObj);
      return filterArray.some((filterObj) => {
        // console.log(">>>>filterObj", filterObj);
        // console.log(
        //   ">>>>keys",
        //   keys.every((key) => {
        //     mainArray[key] === filterArray[key];
        //   })
        // );
      });
    });
  }

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

  const filteredArray = filterArrayWithArray(
    mealArrays,
    tagValues,
    keysToCompare
  );
  // console.log(">>>filter array", filteredArray);

  const FirstRoute = () => (
    <WebView
      textZoom={30}
      style={{ backgroundColor: "#dcdcde" }}
      containerStyle={{
        marginTop: 20,
        flex: 0,
        height: 200,
      }}
      originWhitelist={["*"]}
      source={{
        html: `<p style="font-size: 50; line-height: 1.5; "> ${meal.analyzedInstructions[0].steps} </p`,
      }}
    />
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  // console.log(">>>>Meal Detail", meal.analyzedInstructions[0].steps);
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={{ uri: meal.image }} style={styles.image} />
      </View>
      <View style={styles.heading}>
        <Text style={styles.title}>{meal.title}</Text>
      </View>
      <View style={styles.infoBar}>
        <Text style={styles.infoBarText}>
          {meal.readyInMinutes} min {"\u2022"} {calories} calories
        </Text>
      </View>
      <View style={styles.infoTagContainer}>
        <InfoTag text={`Serves ${meal.servings}`} />
        <InfoTag text={`Ready in ${meal.readyInMinutes} minutes`} />
      </View>

      {/* <View style={styles.group}>
				<Text style={styles.label}>Home Type: </Text>
				<Text style={styles.value}>{meal.homeType} </Text>
			</View>
			<View style={styles.group}>
				<Text style={styles.label}>Price: </Text>
				<Text style={styles.value}>${meal.price} </Text>
			</View>
			<View style={styles.group}>
				<Text style={styles.label}>Year Built: </Text>
				<Text style={styles.value}>{meal.yearBuilt} </Text>
			</View>
			<View style={styles.group}>
				<Text style={styles.label}>Address: </Text>
				<Text style={styles.value}>{meal.address}</Text>
			</View>*/}
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </ScrollView>
  );
};

export default MealDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    marginHorizontal: 20,
    marginBottom: 10,
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
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
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
});
