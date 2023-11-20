import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "./reducers/mealsReducer";
import favoritesReducer from "./reducers/favoritesReducer";

const store = configureStore({
  reducer: {
    meals: mealsReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    });
  },
});

export default store;
