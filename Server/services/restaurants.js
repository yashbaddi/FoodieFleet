import { get } from "lodash";
import {
  createItem,
  deleteItem,
  readItem,
  updateItem,
} from "../model/items.js";
import {
  createRestaurant,
  deleteRestaurant,
  readRestaurant,
  updateRestaurant,
} from "../model/restaurants.js";

import restaurantModel from "../model/restaurants.js";
import itemModel from "../model/items.js";

const restaurantService = {
  getAllRestaurants: getAllRestaurants,
  getRestaurantsByID: getRestaurantsByID,
};

async function getAllRestaurants() {
  const data = await restaurantModel.readRestaurant();
  const response = data.map((restaurant) => restaurant.data);
  return response;
}

async function getRestaurantsByID(restaurnatID) {
  const data = restaurantModel.readRestaurant({ id: restaurnatID });
  return data;
}

export default restaurantService;
