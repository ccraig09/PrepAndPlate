import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelomeScreen from "../screens/WelomeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
function AuthNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(screenProps) => (
            <LoginScreen
              {...screenProps}
              updateAuthState={props.updateAuthState}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Register" options={{ headerShown: false }}>
          {(screenProps) => (
            <RegisterScreen
              {...screenProps}
              updateAuthState={props.updateAuthState}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Forgot"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;
