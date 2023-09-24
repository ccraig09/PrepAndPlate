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
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Input } from "@rneui/themed";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";

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
});

const screenWidth = Dimensions.get("window").width;
const LoginScreen = () => {
  const navigation = useNavigation();

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
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              dispatch(authAction.registerUser(values))
                .then(async (result) => {
                  if (result.success) {
                    try {
                      await AsyncStorage.setItem("token", result.token);
                    } catch (err) {
                      console.log(err);
                    }
                    navData.navigation.navigate("Home");
                  } else {
                    Alert.alert("Registration Failed. Try Again");
                  }
                })
                .catch((err) => console.log(err));
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
                  label={"Emal"}
                  placeholder="Enter your email"
                  leftIcon={{
                    type: "font-awesome",
                    name: "envelope-o",
                  }}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  onBlur={handleBlur("email")}
                  inputContainerStyle={styles.inputContainer}
                  errorMessage={touched.email && errors.email}
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
                  onChangeText={handleChange("email")}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  inputContainerStyle={styles.inputContainer}
                  errorMessage={touched.password && errors.password}
                  containerStyle={styles.inputComponent}
                />

                <CustomButton
                  title={"Sign in"}
                  backgroundColor={Colors.primary}
                  textColor={"white"}
                  onPress={handleSubmit}
                  containerStyle={{ width: screenWidth * 0.8 }}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
                  <Text style={styles.forgotButton}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>Dont have account? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.registerButton}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
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
