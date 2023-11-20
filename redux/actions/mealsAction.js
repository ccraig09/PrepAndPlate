import { SecureStoreKeys } from "../../constants/secureStore";

export const LOAD_MEALS = "LOAD_MEALS";
export const LOAD_USER_MEALS = "LOAD_USER_MEALS";
export const SEARCH_MEALS = "SEARCH_MEALS";
export const ADD_MEAL = "ADD_MEAL";

const BASE_URL = `https://api.spoonacular.com`;
const DATABASE_URL = SecureStoreKeys.LOCAL_URL;
// const BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${SecureStoreKeys.API_KEY}&number=1`;

export function loadMeals() {
  return async (dispatch) => {
    // const result = await fetch(`${BASE_URL}`);

    // const resultJson = await result.json();

    // dispatch({ type: LOAD_MEALS, payload: resultJson.recipes });

    return;
  };
}
export function loadUserMeals() {
  return async (dispatch) => {
    const result = await fetch(`${DATABASE_URL}/api/meals`);

    const resultJson = await result.json();

    // console.log(">>>resultJson", resultJson);

    dispatch({ type: LOAD_USER_MEALS, payload: resultJson });

    return;
  };
}

export const addMeal = ({
  title,
  timeOfDay,
  imageUrl,
  date,
  mealData,
  mealId,
}) => {
  return async (dispatch) => {
    console.log(">>>mealData", mealData);
    const response = await fetch(`${DATABASE_URL}/api/meals`, {
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

    dispatch({
      type: ADD_MEAL,
      payload: responseData,
    });
  };
};

export function searchMeals(searchWord) {
  return async (dispatch) => {
    const result = await fetch(
      `${BASE_URL}/recipes/complexSearch?apiKey=${SecureStoreKeys.API_KEY}&number=20&query=${searchWord}&addRecipeNutrition=true`
    );

    const resultJson = await result.json();

    // dispatch({ type: SEARCH_MEALS, payload: resultJson.results });

    return resultJson.results;
  };
}

export function getMealById(id) {
  return async (dispatch) => {
    const result = await fetch(
      `${BASE_URL}/recipes/${id}/information?apiKey=${SecureStoreKeys.API_KEY}&includeNutrition=true`
    );

    const resultJson = await result.json();

    // dispatch({ type: SEARCH_MEALS, payload: resultJson.results });

    return resultJson;
  };
}
