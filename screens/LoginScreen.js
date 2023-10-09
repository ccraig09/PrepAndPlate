import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input, CheckBox } from "@rneui/themed";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authAction from "../redux/actions/authAction";

import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";
import { storeToken } from "../hooks/useStoreToken";
import {
  storeCredentials,
  getStoredCredentials,
  deleteStoredCredentials,
} from "../Utils/rememberMeUtility";

const formSchema = yup.object({
  email: yup
    .string()
    .label("Email")
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .label("Password")
    .required("Password is required")
    .min(6, "Password must have at least 6 characters"),
  rememberMe: yup.boolean(),
});

const screenWidth = Dimensions.get("window").width;

const LoginScreen = ({ updateAuthState }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  useEffect(() => {
    // Check if there are stored credentials and populate the email field
    console.log(">>>storing", formik.values.rememberMe);
    getStoredCredentials()
      .then((storedCredentials) => {
        if (storedCredentials) {
          formik.setValues({
            ...formik.values,
            email: storedCredentials.email,
            password: storedCredentials.password,
            rememberMe: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error retrieving stored credentials:", error);
      });
  }, []);

  const loginUser = async (authData) => {
    const { email, password, rememberMe } = authData;
    setIsLoading(true);
    try {
      if (rememberMe) {
        // Store credentials when "Remember Me" is enabled
        await storeCredentials(email, password);
      } else {
        // Delete stored credentials when "Remember Me" is disabled
        await deleteStoredCredentials();
      }
      dispatch(authAction.loginUser(authData)).then(async (result) => {
        if (result.success) {
          try {
            await storeToken(result.token);
            updateAuthState(true);
          } catch (err) {
            console.log(err);
          }
        } else {
          Alert.alert(`Sign in Failed. ${result.message}`);
        }
      });
    } catch (error) {
      console.log("❌ Error signing in...", error);
      Alert.alert(`Login Failed. ${error.message}`);
    } finally {
      setIsLoading(false);
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
        <Text style={styles.text}>Sign In</Text>
        <View style={styles.box}>
          <View style={{ alignItems: "center" }}>
            <Input
              label={"Emal"}
              placeholder="Enter your email"
              leftIcon={{
                type: "font-awesome",
                name: "envelope-o",
              }}
              onChangeText={formik.handleChange("email")}
              value={formik.values.email}
              onBlur={formik.handleBlur("email")}
              inputContainerStyle={styles.inputContainer}
              errorMessage={formik.touched.email && formik.errors.email}
              containerStyle={styles.inputComponent}
            />
            <Input
              label={"Password"}
              placeholder="Password"
              leftIcon={{
                type: "MaterialIcons",
                name: "lock-outline",
              }}
              secureTextEntry={true}
              onChangeText={formik.handleChange("password")}
              value={formik.values.password}
              onBlur={formik.handleBlur("password")}
              inputContainerStyle={styles.inputContainer}
              errorMessage={formik.touched.password && formik.errors.password}
              containerStyle={styles.inputComponent}
            />

            <CheckBox
              title="Remember me"
              checkedColor={Colors.primary}
              uncheckedColor={Colors.primary}
              containerStyle={{ alignSelf: "flex-start" }}
              checked={formik.values.rememberMe}
              onPress={() =>
                formik.setFieldValue("rememberMe", !formik.values.rememberMe)
              }
            />

            <CustomButton
              title={"Sign in"}
              backgroundColor={Colors.primary}
              textColor={"white"}
              loading={isLoading}
              disabled={isLoading}
              onPress={formik.handleSubmit}
              containerStyle={{ width: screenWidth * 0.8 }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
              <Text style={styles.forgotButton}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Dont have account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerButton}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    width: screenWidth * 0.9,
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
    marginVertical: 10,
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
  forgotButton: { color: "#738289", fontSize: 14, marginVertical: 10 },
  error: {
    color: "red",
  },
});
