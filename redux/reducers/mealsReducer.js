import {
  LOAD_MEALS,
  SEARCH_MEALS,
  LOAD_USER_MEALS,
} from "../actions/mealsAction";

const initialState = {
  meals: [],
  searchResults: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_MEALS:
      return {
        ...state,
        meals: action.payload,
      };
    case LOAD_USER_MEALS:
      return {
        ...state,
        meals: action.payload,
      };
    case SEARCH_MEALS:
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
}
