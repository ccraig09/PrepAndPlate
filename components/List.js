import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";

import HeadCard from "./HeadCard";

const List = ({ searchWord, setClicked, data }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchWord === "") {
      return <HeadCard title={item.name} details={item.details} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchWord.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <HeadCard title={item.name} details={item.details} />;
    }
    // filter of the description
    if (
      item.details
        .toUpperCase()
        .includes(searchWord.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <HeadCard title={item.name} details={item.details} />;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HeadCard
              title={item.title}
              image={item.image}
              prepTime={item.readyInMinutes}
              healthScore={item.healthScore}
              id={item.id}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "95%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
