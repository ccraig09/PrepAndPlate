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
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Auth } from "aws-amplify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authAction from "../redux/actions/authAction";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";
import { storeToken } from "../hooks/useStoreToken";

const formSchema = yup.object({
  // firstName: yup
  //   .string()
  //   .label("First Name")
  //   .required("First name is required")
  //   .min(3),
  // lastName: yup
  //   .string()
  //   .label("Last Name")
  //   .required("Last name is required")
  //   .min(3),
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

const RegisterScreen = ({ updateAuthState }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const signUpUser = async (authData) => {
    const { email, password } = authData;
    let username = email;
    try {
      setIsLoading(true);
      await Auth.signUp({
        username,
        password,
        attributes: { email },
        autoSignIn: {
          enabled: true,
        },
      });

      dispatch(authAction.signUpSuccess());

      console.log("✅ Sign-up Confirmed");
      await updateAuthState("loggedIn");
    } catch (error) {
      console.log("❌ Error signing up...", error);
      Alert.alert(`Registration Failed. ${error.message}`);
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
        <Text style={styles.text}>Sign Up</Text>
        <View style={styles.box}>
          <Formik
            initialValues={{
              // firstName: "",
              // lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
<<<<<<< HEAD:screens/RegisterScreen.js
              dispatch(authAction.registerUser(values))
                .then(async (result) => {
                  if (result.success) {
                    try {
                      await storeToken(result.token);
                      updateAuthState(true);
                      // dispatch(authAction.addToken(result.token));
                      // await AsyncStorage.setItem("token", result.token);
                    } catch (err) {
                      console.log(err);
                    }
                    // navigation.navigate("Home");
                  } else {
                    Alert.alert(`Sign up Failed. ${result.message}`);
                  }
                })
                .catch((err) => console.log(err));
=======
              signUpUser(values);
>>>>>>> de3edfb6a2e47ee97e3b9b9d74f287c1288ddc03:screens/SignUpScreen.js
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
                {/* <Input
                  label={"First Name"}
                  placeholder="Enter your first name"
                  leftIcon={{ type: "font-awesome", name: "user-o" }}
                  onChangeText={handleChange("firstName")}
                  value={values.firstName}
                  onBlur={handleBlur("firstName")}
                  inputContainerStyle={styles.inputContainer}
                  errorMessage={touched.firstName && errors.firstName}
                  containerStyle={styles.inputComponent}
                />
                <Input
                  label={"Last Name"}
                  placeholder="Enter your last name"
                  leftIcon={{ type: "font-awesome", name: "user-o" }}
                  onChangeText={handleChange("lastName")}
                  value={values.lastName}
                  onBlur={handleBlur("lastName")}
                  inputContainerStyle={styles.inputContainer}
                  errorMessage={touched.lastName && errors.lastName}
                  containerStyle={styles.inputComponent}
                /> */}
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
                  onChangeText={handleChange("password")}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  inputContainerStyle={styles.inputContainer}
                  errorMessage={touched.password && errors.password}
                  containerStyle={styles.inputComponent}
                />

                <CustomButton
                  title={"Sign up"}
                  backgroundColor={Colors.primary}
                  loading={isLoading}
                  disabled={isLoading}
                  textColor={"white"}
                  onPress={handleSubmit}
                  containerStyle={{ width: screenWidth * 0.8 }}
                />
                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>Have an account? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.registerButton}>Login</Text>
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

export default RegisterScreen;

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
