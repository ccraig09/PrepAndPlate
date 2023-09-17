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
      <CustomButton
        title={"Sign up with email"}
        backgroundColor={Colors.primary}
        textColor={"white"}
      />
      <Text>Or use social sign up</Text>
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
  },
  image: {
    height: 300,
    width: 300,
  },
});
