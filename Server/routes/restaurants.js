import express from "express";
import bodyParser from "body-parser";
import restaurantController from "../controller/restaurants.js";
import { authMiddleware } from "../middlewares/auth.js";
import { restaurantWsController } from "../controller/ws/restaurant.js";
import { validateJWTCookie } from "../utils.js";
import expressWs from "express-ws";

const restaurantsRouter = express.Router();

expressWs(restaurantsRouter);

restaurantsRouter.ws("/ws", (ws, req) => {
  const payload = {
    type: "open",
  };
  console.log("Inside WS Restaurant");

  try {
    const user = validateJWTCookie(req.cookies.token);
    ws.restaurantOwner = user;
    console.log("restaurant owner ID in ws connection:", ws.restaurantOwner);
  } catch (e) {
    console.log(e);
  }
  console.log("Socket Connection Open");
  restaurantWsController.setRestaurantSocket(ws);
  ws.send(JSON.stringify(payload));

  const interval = setInterval(() => {
    ws.send(JSON.stringify({ type: "PingPong", data: "ping" }));
  }, 2000);

  ws.on("message", (data) => {
    const message = JSON.parse(data);
    console.dir(message);
    if (message.type === "status") {
      console.log("inside order statrus");
      restaurantWsController.updateOrderStatus(ws, message);
    }
    if (message.type === "getDriverLocation")
      restaurantWsController.sendDriverDetails(ws, message);
  });

  ws.on("close", () => {
    clearInterval(interval);
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
