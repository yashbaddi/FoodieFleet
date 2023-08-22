import { combineReducers } from "redux";
import restaurantsReducer from "./restaurants.reducer";
import { cartReducer } from "./cart.reducer";

export const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  cart: cartReducer,
});
