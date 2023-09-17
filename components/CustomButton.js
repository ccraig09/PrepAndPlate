import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

const CustomButton = ({
  title,
  loading = false,
  backgroundColor,
  textColor,
  iconName,
  iconSize,
  iconColor,
}) => {
  return (
    <Button
      title={title}
      loading={loading}
      icon={{
        name: iconName,
        type: "font-awesome",
        size: iconSize,
        color: iconColor,
      }}
      loadingProps={{
        size: "small",
        color: "rgba(111, 202, 186, 1)",
      }}
      titleStyle={{ fontWeight: "700", color: textColor }}
      buttonStyle={{
        backgroundColor: backgroundColor,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
        paddingVertical: 10,
      }}
      containerStyle={{
        width: "80%",
        marginHorizontal: 50,
        marginVertical: 10,
      }}
    />
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
