import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SecureStoreKeys } from "../../constants/secureStore";

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
export const LOGOUT_USER = "LOGOUT_USER";
export const ADD_TOKEN = "ADD_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";

const BASE_URL = SecureStoreKeys.LOCAL_URL;

// const navigation = useNavigation();

export const registerUser = (authData) => {
  const { firstName, lastName, email, password } = authData;
  return async (dispatch) => {
    console.log(">>>registerUser", authData);
    // logic to make a post request to REGISTER the user
    const result = await fetch(`${BASE_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const resultData = await result.json();

    if (resultData.success) {
      dispatch({ type: REGISTER_USER_SUCCESS, payload: resultData });
    } else {
      dispatch({ type: REGISTER_USER_FAIL });
    }

    return resultData;
  };
};

export const loginUser = (authData) => {
  const { email, password } = authData;

  return async (dispatch) => {
    // logic to make a post request to LOGIN the user
    const result = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const resultData = await result.json();
    console.log(resultData);

    if (resultData.success) {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: resultData });
    } else {
      dispatch({ type: LOGIN_USER_FAIL });
    }

    // add return  to return result data and access
    // from the .then() from the onSubmit()
    return resultData;
  };
};

export const addToken = (token) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TOKEN, payload: token });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_TOKEN });
    await AsyncStorage.removeItem("token")
      .then(() => {
        console.log(">>>>>token removed");

        // use replace to navigate to login screen and not nav back
        // navigation.replace("Login");
      })
      .catch((err) => console.log(err));
    // navigation.navigate("Login");
  };
};
