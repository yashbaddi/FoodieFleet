import express from "express";
import bodyParser from "body-parser";
import restaurantController from "../controller/restaurants.js";
const restaurantsRouter = express.Router();

restaurantsRouter
  .route("/")
  .get(restaurantController.getAllRestaurants)
  .post(bodyParser.json(), restaurantController.createARestaurant);

restaurantsRouter
  .route("/:id")
  .get(restaurantController.getRestaurantsByID)
  .put(bodyParser.json(), restaurantController.updateRestaurantByID)
  .delete(restaurantController.deleteRestaurantByID);

restaurantsRouter
  .route("/:restaurantID/items")
  .get(restaurantController.getMenuOfRestaurant)
  .post(bodyParser.json(), restaurantController.createItemForRestaurant);

restaurantsRouter
  .route("/:restaurantID/items/:itemID")
  .put(bodyParser.json(), restaurantController.updateItemOfRestaurant)
  .delete(restaurantController.deleteItemInRestaurant);

export default restaurantsRouter;
