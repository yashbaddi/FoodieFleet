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

export default {
  getAllRestaurants: getAllRestaurants,
  getRestaurantsByID: getRestaurantsByID,
  getMenuOfRestaurant: getMenuOfRestaurant,
  createARestaurant: createARestaurant,
  createItemForRestaurant: createItemForRestaurant,
  updateItemOfRestaurant: updateItemOfRestaurant,
  deleteItemInRestaurant: deleteItemInRestaurant,
  updateRestaurantByID: updateRestaurantByID,
  deleteRestaurantByID: deleteRestaurantByID,
};

async function getAllRestaurants(req, res) {
  const data = await readRestaurant();
  const response = data.map((restaurant) => restaurant.data);
  res.json(response);
}

async function getRestaurantsByID(req, res) {
  res.json(await readRestaurant({ id: req.params.id }));
}

async function getMenuOfRestaurant(req, res) {
  res.json(await readItem(req.params.restaurantID));
}

async function createARestaurant(req, res) {
  console.log("req body", req.body);
  const response = await createRestaurant(
    "8968071c-4f3d-4fb9-87f8-4f2ccba4c318",
    req.body
  );
  console.log(response);

  res.json(response);
}

async function createItemForRestaurant(req, res) {
  const response = await createItem(req.params.restaurantID, req.body);
  res.json(response);
}

async function updateItemOfRestaurant(req, res) {
  res.json(await updateItem(req.params.itemID, req.body));
}

async function deleteItemInRestaurant(req, res) {
  res.json(await deleteItem(req.params.itemID));
}

async function updateRestaurantByID(req, res) {
  res.json(await updateRestaurant(req.params.id, req.body));
}

async function deleteRestaurantByID(req, res) {
  res.json(await deleteRestaurant(req.params.id));
}
