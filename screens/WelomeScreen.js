import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";

const WelomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/appLogo.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.box}>
        <CustomButton
          title={"Sign up with email"}
          backgroundColor={Colors.primary}
          textColor={"white"}
          onPress={() => {
            navigation.navigate("Register");
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
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
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => navigation.navigate("Login")}
          >
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default WelomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "40%",
    width: "90%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  image: {
    height: 300,
    width: 300,
  },

  loginText: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "500",
  },
});
