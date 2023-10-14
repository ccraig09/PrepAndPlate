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
  const meal = useSelector((state) =>
    state.meals.searchResults.find((meal) => meal.id == mealId)
  );
  const [index, setIndex] = useState(0);
  const [trueTagValues, setTrueTagValues] = useState({});
  const [routes] = useState([
    { key: "first", title: "Instructions" },
    { key: "second", title: "Ingredients" },
  ]);
  const layout = useWindowDimensions();
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

  const nutrition = meal.nutrition.nutrients;
  const calories = nutrition[0].amount.toFixed(0);

  useEffect(() => {
    keysToCompare.forEach((key) => {
      if (matchingObject[key] === true) {
        matchingValues[key] = true;
      }
    });
    setTrueTagValues(matchingValues);
    console.log(">>>>>matchingValues", matchingValues);
  }, []);

  const Tags = () => {
    return (
      <View style={styles.infoTagContainer}>
        {Object.keys(trueTagValues).map((key) => (
          <>
            <InfoTag text={key} key={key} />
          </>
        ))}
      </View>
    );
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: "green" }}
    />
  );

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
      <Tags />

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
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
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
});
