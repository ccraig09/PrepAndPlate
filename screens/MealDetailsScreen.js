import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";

import { InfoTag } from "../components/InfoTag";

const MealDetailsScreen = (props) => {
	const { mealId } = props.route.params;

	const meal = useSelector((state) =>
		state.meals.meals.find((meal) => meal.id == mealId)
	);

	console.log(">>>>", meal.extendedIngredients[1].image);
	return (
		<ScrollView style={styles.container}>
			<View style={styles.heading}>
				<Text style={styles.title}>{meal.title}</Text>
			</View>
			<View>
				<Image source={{ uri: meal.image }} style={styles.image} />
			</View>
			<View style={styles.infoTagContainer}>
				<InfoTag
					name={"person"}
					color={"black"}
					text={`Serves ${meal.servings}`}
				/>
				<InfoTag
					name={"time"}
					color={"black"}
					text={`Ready in ${meal.readyInMinutes} minutes`}
				/>
			</View>

			{/* <View style={styles.group}>
				<Text style={styles.label}>Home Type: </Text>
				<Text style={styles.value}>{meal.homeType} </Text>
			</View>
			<View style={styles.group}>
				<Text style={styles.label}>Price: </Text>
				<Text style={styles.value}>${meal.price} </Text>
			</View>
			<View style={styles.group}>
				<Text style={styles.label}>Year Built: </Text>
				<Text style={styles.value}>{meal.yearBuilt} </Text>
			</View>
			<View style={styles.group}>
				<Text style={styles.label}>Address: </Text>
				<Text style={styles.value}>{meal.address}</Text>
			</View>*/}
			<View style={styles.group}>
				<Text style={styles.label}>Instructions: </Text>
				<WebView
					textZoom={30}
					style={{ backgroundColor: "#dcdcde" }}
					containerStyle={{
						marginTop: 20,
						flex: 0,
						height: 200,
					}}
					originWhitelist={["*"]}
					source={{
						html: `<p style="font-size: 50; line-height: 1.5; "> ${meal.instructions} </p`,
					}}
				/>
			</View>
			<View style={styles.group}>
				<Text style={styles.label}>Ingredients: </Text>
			</View>
		</ScrollView>
	);
};

export default MealDetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 20,
	},
	heading: {
		marginHorizontal: 20,
		marginBottom: 10,
	},
	title: {
		fontWeight: "bold",
		fontSize: 24,
	},
	image: {
		width: "100%",
		height: 300,
	},

	infoTagContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginHorizontal: 20,
		marginVertical: 10,
	},
	instructions: {
		flex: 1,
		// fontSize: 30,
		// height: 200,
	},
	group: {
		flex: 1,
		marginHorizontal: 20,
		marginVertical: 10,
		// flexDirection: "row",
	},
	label: {
		fontSize: 18,
	},
	value: {
		fontSize: 18,
		fontWeight: "bold",
		flexShrink: 1,
	},
});
