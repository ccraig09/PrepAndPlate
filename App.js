import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";

import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export default function App() {
  const [jwt, setJwt] = useState(null);

  const loadUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("no user");
      setJwt(null);
      return;
    }
    console.log(">>>>token", token);
    setJwt(token);
    // const decoded = jwtDecode(token);
    // setFullName(decoded.fullName);
    // setEmail(decoded.email);
  };

  useEffect(() => {
    loadUser();
  }, [jwt]);

  return (
    <Provider store={store}>
      {jwt ? <AppNavigator /> : <AuthNavigator />}
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
