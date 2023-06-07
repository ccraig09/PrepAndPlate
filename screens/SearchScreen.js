import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import List from "../components/List";
import SearchBar from "../components/SearchBar";

const SearchScreen = () => {
  const [searchWord, setSearchWord] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
      );
      const data = await apiResponse.json();
      setFakeData(data);
      console.log(data);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}>Meals</Text>}
      <SearchBar
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        clicked={clicked}
        setClicked={setClicked}
      />
      {!fakeData ? (
        <ActivityIndicator size="large" />
      ) : (
        <List searchWord={searchWord} data={fakeData} setClicked={setClicked} />
      )}

      <Text>{searchWord}</Text>
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
