import express from "express";
import {
  createARestaurant,
  createItemForRestaurant,
  deleteItemInRestaurant,
  deleteRestaurantByID,
  getAllRestaurants,
  getMenuOfRestaurant,
  getRestaurantsByID,
  updateItemOfRestaurant,
  updateRestaurantByID,
} from "../controller/restaurants.js";
import bodyParser from "body-parser";

const restaurantsRouter = express.Router();

restaurantsRouter
  .route("/")
  .get(getAllRestaurants)
  .post(bodyParser.json(), createARestaurant);

restaurantsRouter
  .route("/:id")
  .get(getRestaurantsByID)
  .put(bodyParser.json(), updateRestaurantByID)
  .delete(deleteRestaurantByID);

restaurantsRouter
  .route("/:restaurantID/items")
  .get(getMenuOfRestaurant)
  .post(bodyParser.json(), createItemForRestaurant);

restaurantsRouter
  .route("/:restaurantID/items/:itemID")
  .put(bodyParser.json(), updateItemOfRestaurant)
  .delete(deleteItemInRestaurant);

export default restaurantsRouter;
