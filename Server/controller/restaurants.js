import { readItem } from "../model/items.js";
import { readRestaurant } from "../model/restaurants.js";

export async function getAllRestaurants(req, res) {
  const data = await readRestaurant();
  const response = data.map((restaurant) => restaurant.data);
  res.json(response);
}

export async function getRestaurantsByID(req, res) {
  res.json(await readRestaurant(req.params.id));
}

export async function getMenuOfRestaurant(req, res) {
  res.json(await readItem(req.params.id));
}
