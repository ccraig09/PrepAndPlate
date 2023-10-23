import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import * as SecureStore from "expo-secure-store";

import store from "./redux/store";
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import Colors from "./constants/Colors";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      checkTokenExpiration();
      renderAppStack();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loggedIn]);

  const checkTokenExpiration = async () => {
    try {
      const tokenExpiration = await SecureStore.getItemAsync("tokenExpiration");
      const expirationDate = new Date(tokenExpiration);

      if (expirationDate <= new Date()) {
        // Token has expired, clear it and log the user out
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("tokenExpiration");
        setLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking token expiration:", error);
    }
  };

  function updateAuthState(isUserLoggedIn) {
    setLoggedIn(isUserLoggedIn);

    console.log("logged in user");
  }

  const renderAppStack = async () => {
    const token = await SecureStore.getItemAsync("token");

    return token ? setLoggedIn(true) : setLoggedIn(false);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      {loggedIn ? (
        <AppNavigator updateAuthState={updateAuthState} />
      ) : (
        <AuthNavigator updateAuthState={updateAuthState} />
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
