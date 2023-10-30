import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  Button,
  SectionList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import mealPrepData from "../components/DummyData";
import * as mealAction from "../redux/actions/mealsAction";
import SectionItem from "../components/SectionItem";
import CustomHeader from "../components/CustomHeader";
import { useWeekRelationship } from "../hooks/useWeekRelationship";
import Colors from "../constants/Colors";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const weekStart = currentWeek.clone().startOf("week");
  const weekEnd = currentWeek.clone().endOf("week");
  const weekRelationship = useWeekRelationship(currentWeek);
  const sectionListRef = useRef(null);

  // const headerText = () => {
  //   switch (weekRelationship) {
  //     case "This Week":
  //       console.log("The date is in this week.");
  //       break;
  //     case "Next Week":
  //       console.log("The date is in next week.");
  //       break;
  //     case "Last Week":
  //       console.log("The date is in last week.");
  //       break;
  //     default:
  //       console.log("The date is in another week.");
  //       break;
  //   }
  // };

  const formattedCurrentWeek = currentWeek.format("MMMM Do YYYY");

  useFocusEffect(
    React.useCallback(() => {
      loadMeals();
    }, [])
  );

  useEffect(() => {
    const today = moment().format("ddd MMM D");
    const todayIndex = sections.findIndex((section) => section.title === today);
    console.log("todayIndex: " + todayIndex);
    if (todayIndex !== -1 && sectionListRef.current) {
      setTimeout(() => {
        sectionListRef.current.scrollToLocation({
          sectionIndex: todayIndex,
          itemIndex: 0,
          animated: true,
        });
      }, 100);
    }
  }, []);

  const { meals } = useSelector((state) => state.meals);

  const filteredMealPrepData = meals.filter((meal) => {
    const mealDate = moment(meal.createdAt, "YYYY-MM-DD");
    return mealDate.isBetween(weekStart, weekEnd, null, "[]");
  });

  useEffect(() => {
    sections.sort((a, b) => {
      const dateA = new Date(a.title);
      const dateB = new Date(b.title);
      return dateA - dateB;
    });
  }, []);

  const loadMeals = () => {
    setIsLoading(true);
    dispatch(mealAction.loadUserMeals()).then(() => setIsLoading(false));
  };

  const getItemLayout = (_, index) => {
    return {
      length: 60,
      offset: 60 * index,
      index,
    };
  };

  const goToPreviousWeek = () => {
    setCurrentWeek(currentWeek.clone().subtract(1, "week"));
  };

  const goToNextWeek = () => {
    setCurrentWeek(currentWeek.clone().add(1, "week"));
  };

  // Organize meal prep data into sections by date
  const groupedMealPrepData = filteredMealPrepData.reduce((acc, meal) => {
    const date = moment(meal.date, "YYYY-MM-DD").format("ddd MMM D");

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(meal);

    return acc;
  }, {});

  // Convert groupedMealPrepData into an array of sections
  const sections = Object.keys(groupedMealPrepData).map((date) => ({
    title: date,
    data: groupedMealPrepData[date],
  }));

  const renderSectionHeader = ({ section }) => {
    const sectionDate = moment(section.title, "ddd MMM D");
    const today = moment().startOf("day");
    const tomorrow = today.clone().add(1, "day");

    if (sectionDate.isSame(today, "day")) {
      return (
        <View>
          <Text style={styles.sectionHeader}>Today</Text>
        </View>
      );
    } else if (sectionDate.isSame(tomorrow, "day")) {
      return <Text style={styles.sectionHeader}>Tomorrow</Text>;
    } else {
      return <Text style={styles.sectionHeader}>{section.title}</Text>;
    }
  };

  const renderEmptySection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.noData}>
        No meal prep items scheduled for this week.
      </Text>
    </View>
  );

  const onPressHandler = (data) => {
    navigation.navigate("Details", { meal: data });
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
      <ImageBackground
        source={require("../assets/tree.jpeg")}
        style={styles.backgroundImage}
      >
        <CustomHeader
          leftButtonText={"Back"}
          rightButtonText={"Edit"}
          onLeftButtonPress={goToPreviousWeek}
          onRightButtonPress={goToNextWeek}
          title={weekRelationship}
        />
        <View style={styles.sectionContainer}>
          {/* {filteredMealPrepData.length === 0 ? (
          <Text style={styles.noData}>
            No meal prep items scheduled for this week.
          </Text>
        ) : ( */}
          <SectionList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={loadMeals} />
            }
            ref={sectionListRef}
            showsVerticalScrollIndicator={false}
            sections={sections}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <SectionItem
                item={item}
                onPress={() => {
                  onPressHandler(item.mealData[0]);
                }}
              />
            )}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={renderEmptySection}
            getItemLayout={getItemLayout}
          />
          {/* )} */}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  sectionContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "rgba(255,255,255, .4)",
    padding: 8,
  },
  item: {
    padding: 8,
  },
});

export default HomeScreen;
