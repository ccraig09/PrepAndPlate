import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "./reducers/mealsReducer";

const store = configureStore({
  reducer: {
    meals: mealsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    });
  },
});

export default store;
