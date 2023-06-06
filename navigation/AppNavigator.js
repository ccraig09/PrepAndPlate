import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import HomeScreen from "../screens/HomeScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SearchScreen from "../screens/SearchScreen";
// import RegisterScreen from "../screens/RegisterScreen";

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerBackVisible: false, headerTitle: "" }}
      />
      <Stack.Screen name="Details" component={MealDetailsScreen} />
    </Stack.Navigator>
  );
}
function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{ headerBackVisible: false, headerTitle: "Favorites" }}
      />
      <Stack.Screen name="Details" component={MealDetailsScreen} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Favorites") {
              iconName = "star";
            } else if (route.name === "Search") {
              iconName = "search";
            }
            return <MaterialIcons name={iconName} size={24} />;
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Favorites" component={FavoritesStack} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
