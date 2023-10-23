import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { SecureStoreKeys } from "../constants/secureStore";

const NutritionScreen = (props) => {
  const { id } = props.route.params;
  console.log(">>>>id", id);
  const BASE_URL = `https://api.spoonacular.com`;

  const [htmlLink, setHtmlLink] = useState(null);

  const getNutrition = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/641166/nutritionLabel.png?apiKey=c43771cfd45c49c782fb75ee1f70ac4e`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(">>>data", data);
        setHtmlLink(data);
      })
      .catch((error) => {
        console.error("Error fetching nutrition label data:", error);
      });
    const data = await response.json();
    console.log(">>>data", data);
  };

  useEffect(() => {
    async () => {
      await fetch(
        `https://api.spoonacular.com/recipes/${id}/nutritionLabel.png?apiKey=${SecureStoreKeys.API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(">>>data", data);
          setHtmlLink(data);
        })
        .catch((error) => {
          console.error("Error fetching nutrition label data:", error);
        });
    };
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        // textZoom={30}
        style={{ backgroundColor: "#dcdcde" }}
        // containerStyle={{
        //   flex: 0,
        // }}
        originWhitelist={["*"]}
        source={{
          html: `${htmlLink}`,
        }}
      />
    </View>
  );
};

export default NutritionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
