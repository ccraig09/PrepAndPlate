import { SecureStoreKeys } from "../../constants/secureStore";

export const LOAD_MEALS = "LOAD_MEALS";

const BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${SecureStoreKeys.API_KEY}&number=1`;

export function loadMeals() {
	return async (dispatch) => {
		// const result = await fetch(`${BASE_URL}`);

		// const resultJson = await result.json();

		// dispatch({ type: LOAD_MEALS, payload: resultJson.recipes });

		return;
	};
}
