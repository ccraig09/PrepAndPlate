import { SecureStoreKeys } from "../../constants/secureStore";

export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const LOAD_FAVORITES = "LOAD_FAVORITES";

const DATABASE_URL = SecureStoreKeys.LOCAL_URL;

export const addToFavorites = ({
  title,
  timeOfDay,
  imageUrl,
  date,
  mealData,
  mealId,
}) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${DATABASE_URL}/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          timeOfDay,
          imageUrl,
          date,
          mealData,
          mealId,
        }),
      });
      const responseData = await response.json();
      console.log(">>>responseData", responseData);

      dispatch({
        type: ADD_TO_FAVORITES,
        payload: responseData,
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };
};
export const removeFromFavorites = (mealId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${DATABASE_URL}/api/favorites/${mealId}`, {
        method: "DELETE",
      });
      const responseData = await response.json();
      console.log(">>>responseData", responseData);

      dispatch({
        type: REMOVE_FROM_FAVORITES,
        payload: responseData,
      });
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };
};
export const loadFavorites = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${DATABASE_URL}/api/favorites`);
      const responseData = await response.json();
      console.log(">>>responseData", responseData);

      dispatch({
        type: LOAD_FAVORITES,
        payload: responseData,
      });
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };
};
