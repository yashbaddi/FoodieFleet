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
  getMenuOfRestaurant: getMenuOfRestaurant,
  createRestaurant: createRestaurant,
  createItemForRestaurant: createItemForRestaurant,
  updateItemOfRestaurant: updateItemOfRestaurant,
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

async function getMenuOfRestaurant(restaurantID) {
  const response = await itemModel.readItem(restaurantID);
  return response;
}
async function createRestaurant(userID, restaurantData) {
  const response = await restaurantModel.createRestaurant(
    userID,
    restaurantData
  );
  return response;
}

async function createItemForRestaurant(restaurantID, itemData) {
  const response = await itemModel.createItem(restaurantID, itemData);
  return response;
}

async function updateItemOfRestaurant(itemID, itemData) {
  const response = await itemModel.updateItem(itemID, itemData);
  return response;
}

export default restaurantService;
