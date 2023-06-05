import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export const InfoTag = ({ name, color, text }) => {
	return (
		<View style={styles.container}>
			<View style={styles.contentRow}>
				<Ionicons name={name} size={25} color={color} />
				<Text style={styles.text}>{text}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginLeft: 10,
		backgroundColor: "#dcdcde",
		borderRadius: 30,
		alignSelf: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 6,
	},
	contentRow: {
		flexDirection: "row",
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		marginLeft: 10,
		fontSize: 18,
	},
});
