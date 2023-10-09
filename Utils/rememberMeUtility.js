import * as SecureStore from "expo-secure-store";

export const storeCredentials = async (email, password) => {
  try {
    console.log(">>>storing these", email, password);
    await SecureStore.setItemAsync("userEmail", email);
    await SecureStore.setItemAsync("userPassword", password);
    return true;
  } catch (error) {
    console.error("Error storing credentials:", error);
    return false;
  }
};

export const getStoredCredentials = async () => {
  try {
    const email = await SecureStore.getItemAsync("userEmail");
    const password = await SecureStore.getItemAsync("userPassword");
    if (email && password) {
      console.log(">>>email", email);
      return { email, password };
    }
    return null;
  } catch (error) {
    console.error("Error retrieving credentials:", error);
    return null;
  }
};

export const deleteStoredCredentials = async () => {
  try {
    await SecureStore.deleteItemAsync("userEmail");
    await SecureStore.deleteItemAsync("userPassword");
    return true;
  } catch (error) {
    console.error("Error deleting credentials:", error);
    return false;
  }
};
