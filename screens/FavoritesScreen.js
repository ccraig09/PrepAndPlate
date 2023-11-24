import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loadFavorites } from "../redux/actions/favoritesAction";
import SectionItem from "../components/SectionItem";

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const favorites = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  const onPressHandler = (data) => {
    navigation.navigate("Details", { mealId: data.id });
  };

  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <SectionItem
            item={item}
            onPress={() => {
              onPressHandler(item.mealData[0]);
            }}
          />
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
