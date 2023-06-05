import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "./reducers/mealsReducer";

const store = configureStore({
	reducer: {
		meals: mealsReducer,
	},
});

export default store;
