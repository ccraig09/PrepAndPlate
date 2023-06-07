import { SecureStoreKeys } from "../../constants/secureStore";

export const LOAD_MEALS = "LOAD_MEALS";
export const SEARCH_MEALS = "SEARCH_MEALS";

const BASE_URL = `https://api.spoonacular.com`;
// const BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${SecureStoreKeys.API_KEY}&number=1`;

export function loadMeals() {
  return async (dispatch) => {
    // const result = await fetch(`${BASE_URL}`);

    // const resultJson = await result.json();

    // dispatch({ type: LOAD_MEALS, payload: resultJson.recipes });

    return;
  };
}

export function searchMeals(searchWord) {
  return async (dispatch) => {
    const result = await fetch(
      `${BASE_URL}/recipes/complexSearch?apiKey=${SecureStoreKeys.API_KEY}&number=50&query=${searchWord}&addRecipeInformation=true&instructionsRequired=true`
    );

    const resultJson = await result.json();

    dispatch({ type: SEARCH_MEALS, payload: resultJson.results });
  };
}
