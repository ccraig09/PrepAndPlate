import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import List from "../components/List";
import SearchBar from "../components/SearchBar";
import * as mealAction from "../redux/actions/mealsAction";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.meals);

  const [searchWord, setSearchWord] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     const apiResponse = await fetch(
  //       "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
  //     );
  //     const data = await apiResponse.json();
  //     setFakeData(data);
  //     // console.log(data);
  //   };
  //   getData();
  // }, []);

  const onSearch = () => {
    setIsLoading(true);
    dispatch(mealAction.searchMeals(searchWord))
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}>Meals</Text>}
      <SearchBar
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        clicked={clicked}
        setClicked={setClicked}
        onSearch={onSearch}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <List
          searchWord={searchWord}
          data={searchResults}
          setClicked={setClicked}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});
