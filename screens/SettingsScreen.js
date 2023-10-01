import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";

import CustomButton from "../components/CustomButton";
import * as authAction from "../redux/actions/authAction";

const screenWidth = Dimensions.get("window").width;

const SettingsScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
      <CustomButton
        title={"Logout"}
        backgroundColor={"red"}
        textColor={"white"}
        onPress={() => dispatch(authAction.logoutUser())}
        containerStyle={{ width: screenWidth * 0.8 }}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
