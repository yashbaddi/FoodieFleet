import express from "express";
import bodyParser from "body-parser";
import restaurantController from "../controller/restaurants.js";
import { authMiddleware } from "../middlewares/auth.js";
const restaurantsRouter = express.Router();

restaurantsRouter
  .route("/")
  .get(authMiddleware, restaurantController.getAllRestaurants)
  .post(
    authMiddleware,
    bodyParser.json(),
    restaurantController.createRestaurant
  );

restaurantsRouter
  .route("/:id")
  .get(authMiddleware, restaurantController.getRestaurantsByID)
  .put(
    authMiddleware,
    bodyParser.json(),
    restaurantController.updateRestaurantByID
  )
  .delete(authMiddleware, restaurantController.deleteRestaurantByID);

restaurantsRouter
  .route("/:restaurantID/items")
  .get(authMiddleware, restaurantController.getMenuOfRestaurant)
  .post(
    authMiddleware,
    bodyParser.json(),
    restaurantController.createItemForRestaurant
  );

restaurantsRouter
  .route("/:restaurantID/items/:itemID")
  .put(
    authMiddleware,
    bodyParser.json(),
    restaurantController.updateItemOfRestaurant
  )
  .delete(authMiddleware, restaurantController.deleteItemInRestaurant);

export default restaurantsRouter;
