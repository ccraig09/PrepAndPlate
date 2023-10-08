import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";

export const storeToken = async (token) => {
  const decodedToken = jwt_decode(token);
  try {
    console.log(">>>token", decodedToken);
    const expirationDate = new Date(decodedToken.exp * 1000);
    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync(
      "tokenExpiration",
      expirationDate.toString()
    );
  } catch (error) {
    console.error("Error storing token:", error);
  }
};
