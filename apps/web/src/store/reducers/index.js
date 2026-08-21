import { combineReducers } from "redux";
import restaurantsReducer from "./restaurants.reducer";
import { cartReducer } from "./cart.reducer";
import { driverLocationReducer } from "./DriverLocation.reducer";

export const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  cart: cartReducer,
  driverLocation: driverLocationReducer,
});
