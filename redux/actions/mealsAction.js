import { SecureStoreKeys } from "../../constants/secureStore";

export const LOAD_MEALS = "LOAD_MEALS";
export const LOAD_USER_MEALS = "LOAD_USER_MEALS";
export const SEARCH_MEALS = "SEARCH_MEALS";

const BASE_URL = `https://api.spoonacular.com`;
const DATABASE_URL = `http://localhost:3000`;
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

    console.log(">>>resultJson", resultJson);

    dispatch({ type: LOAD_USER_MEALS, payload: resultJson });

    return;
  };
}

export function searchMeals(searchWord) {
  return async (dispatch) => {
    const result = await fetch(
      `${BASE_URL}/recipes/complexSearch?apiKey=${SecureStoreKeys.API_KEY}&number=10&query=${searchWord}&instructionsRequired=true&addRecipeNutrition=true&includeNutrition=true`
    );

    const resultJson = await result.json();

    dispatch({ type: SEARCH_MEALS, payload: resultJson.results });
  };
}
