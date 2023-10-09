import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Auth } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";

import { Formik } from "formik";
import * as yup from "yup";
import { Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authAction from "../redux/actions/authAction";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";

const formSchema = yup.object({
  authCode: yup
    .string()
    .label("Auth Code")
    .required("Auth code is required")
    .min(5),
});

const screenWidth = Dimensions.get("window").width;

export default function ConfirmUserScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { email } = route.params;

  const confirmUser = async (authData) => {
    const { authCode } = authData;
    let username = email;
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log("✅ Code confirmed");
    } catch (error) {
      console.log(
        "❌ Verification code does not match. Please enter a valid verification code.",
        error
      );
      Alert.alert(`Verification Failed. ${error.message}`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/appLogo.png")}
          resizeMode="cover"
          style={styles.image}
        />
        <Text style={styles.text}>Verify Code</Text>
        <View style={styles.box}>
          <Formik
            initialValues={{
              authCode: "",
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              confirmUser(values);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={{ alignItems: "center" }}>
                <Input
                  label={"Auth Code"}
                  placeholder="Enter verification code"
                  leftIcon={{
                    type: "MaterialIcons",
                    name: "lock-outline",
                  }}
                  onChangeText={handleChange("authCode")}
                  value={values.authCode}
                  onBlur={handleBlur("authCode")}
                  keyboardType="numeric"
                  inputContainerStyle={styles.inputContainer}
                  errorMessage={touched.password && errors.authCode}
                  containerStyle={styles.inputComponent}
                />

                <CustomButton
                  title={"Verify Code"}
                  backgroundColor={Colors.primary}
                  textColor={"white"}
                  onPress={handleSubmit}
                  containerStyle={{ width: screenWidth * 0.8 }}
                />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: 150,
    width: 200,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    // height: "60%",
    marginBottom: 10,
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

  text: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  input: {
    width: 300,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    padding: 16,
    fontSize: 16,
  },
  marginVertical: 10,
  inputContainer: {
    borderBottomWidth: 2,
    borderColor: Colors.primary,
    width: "100%",
  },
  inputComponent: {
    width: "100%",
  },
  button: {
    width: 300,
    backgroundColor: "#738289",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  registerContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  registerText: {
    color: "#738289",
    fontSize: 16,
  },
  registerButton: {
    color: "#738289",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
});
