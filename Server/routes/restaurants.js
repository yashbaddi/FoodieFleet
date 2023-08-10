import express from "express";
import {
  getAllRestaurants,
  getMenuOfRestaurant,
  getRestaurantsByID,
} from "../controller/restaurants.js";

const restaurantsRouter = express.Router();

restaurantsRouter.route("/").get(getAllRestaurants);

restaurantsRouter.route("/:id").get(getRestaurantsByID);

restaurantsRouter.route("/:id/items").get(getMenuOfRestaurant);

export default restaurantsRouter;
