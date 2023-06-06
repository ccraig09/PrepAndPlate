import { LOAD_MEALS } from "../actions/mealsAction";

const initialState = {
  meals: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_MEALS:
      return {
        ...state,
        meals: action.payload,
      };
    default:
      return state;
  }
}
