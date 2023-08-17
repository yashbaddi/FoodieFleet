import { combineReducers } from "redux";
import restaurantsReducer from "./restaurants.reducer";

export const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
});
