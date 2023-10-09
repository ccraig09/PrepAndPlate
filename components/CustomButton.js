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
  onPress,
  disabled,
  containerStyle,
}) => {
  return (
    <Button
      onPress={onPress}
      title={title}
      disabled={disabled}
      disabledStyle={{ backgroundColor: backgroundColor }}
      loading={loading}
      icon={{
        name: iconName,
        type: "font-awesome",
        size: iconSize,
        color: iconColor,
      }}
      loadingProps={{
        size: "small",
        color: "white",
      }}
      titleStyle={{ fontWeight: "700", color: textColor }}
      buttonStyle={{
        backgroundColor: backgroundColor,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
        paddingVertical: 10,
      }}
      containerStyle={[
        {
          width: "85%",
          marginVertical: 10,
        },
        containerStyle,
      ]}
    />
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
