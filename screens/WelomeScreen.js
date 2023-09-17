import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";

const WelomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/appLogo.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          title={"Sign up with email"}
          backgroundColor={Colors.primary}
          textColor={"white"}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: "20%",
              height: 1,
              borderWidth: 1,
            }}
          />
          <Text style={{ marginHorizontal: 15 }}>Or use social sign up</Text>
          <View
            style={{
              width: "20%",
              height: 1,
              borderWidth: 1,
            }}
          />
        </View>
        <CustomButton
          title={"Continue with Google"}
          backgroundColor={Colors.primary}
          textColor={"white"}
        />
        <CustomButton
          title={"Continue with Apple"}
          backgroundColor={Colors.primary}
          textColor={"white"}
        />
      </View>
      <Text>
        Already have an account?{" "}
        <Text style={{ textDecorationLine: "underline" }}>Log In</Text>
      </Text>
    </View>
  );
};

export default WelomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 300,
    width: 300,
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
});
