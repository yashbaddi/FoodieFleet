import {
  createItem,
  deleteItem,
  readItem,
  updateItem,
} from "../model/items.js";
import { createRestaurant, readRestaurant } from "../model/restaurants.js";

export async function getAllRestaurants(req, res) {
  const data = await readRestaurant();
  const response = data.map((restaurant) => restaurant.data);
  res.json(response);
}

export async function getRestaurantsByID(req, res) {
  res.json(await readRestaurant({ id: req.params.id }));
}

export async function getMenuOfRestaurant(req, res) {
  res.json(await readItem(req.params.restaurantID));
}

export async function createARestaurant(req, res) {
  console.log("req body", req.body);
  const response = await createRestaurant(
    "8968071c-4f3d-4fb9-87f8-4f2ccba4c318",
    req.body
  );
  console.log(response);

  res.json(response);
}

export async function createItemForRestaurant(req, res) {
  const response = await createItem(req.params.restaurantID, req.body);
  res.json(response);
}

export async function updateItemOfRestaurant(req, res) {
  res.json(await updateItem(req.params.itemID, req.body));
}

export async function deleteItemInRestaurant(req, res) {
  res.json(await deleteItem(req.params.itemID));
}
