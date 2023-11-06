import express from "express";
import bodyParser from "body-parser";
import restaurantController from "../controller/restaurants.js";
import { authMiddleware } from "../middlewares/auth.js";
import { restaurantWsController } from "../controller/ws/restaurant.js";
import { validateJWTCookie } from "../utils.js";
import expressWs from "express-ws";

const restaurantsRouter = express.Router();

expressWs(restaurantsRouter);

restaurantsRouter.ws("/ws", bodyParser.json(), (ws, req) => {
  const payload = {
    type: "open",
  };

  try {
    const user = validateJWTCookie(req.cookies.token);
    ws.restaurantID = req.body.restaurantID;
    console.log("restaurant ID in ws connection:", ws.restaurantID);
  } catch (e) {
    console.log(e);
  }
  restaurantWsController.setRestaurantSocket(ws);
  ws.send(JSON.stringify(payload));

  ws.on("close", () => {
    restaurantWsController.closeRestaurantSocket(ws);
  });
});

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
