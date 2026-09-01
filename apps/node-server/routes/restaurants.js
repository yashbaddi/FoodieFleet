import express from "express";
import bodyParser from "body-parser";
import restaurantController from "../controller/restaurants.js";
import { authMiddleware } from "../middlewares/auth.js";
import { restaurantWsController } from "../controller/ws/restaurant.js";
import { validateJWTCookie } from "../utils.js";
import expressWs from "express-ws";

const restaurantsRouter = express.Router();

expressWs(restaurantsRouter);

/**
 * @openapi
 * /restaurants/ws:
 *   get:
 *     summary: Restaurant Owner WebSocket stream
 *     tags:
 *       - Restaurants
 *     description: Real-time WebSocket connection for restaurant owners to monitor order incoming status and request driver locations.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       101:
 *         description: Switching protocols to WebSocket stream.
 */
restaurantsRouter.ws("/ws", (ws, req) => {
  const payload = {
    type: "open",
  };

  try {
    const user = validateJWTCookie(req.cookies.token);
    ws.restaurantOwner = user;
  } catch (e) {
    console.log(e);
  }
  restaurantWsController.setRestaurantSocket(ws);
  ws.send(JSON.stringify(payload));

  const interval = setInterval(() => {
    ws.send(JSON.stringify({ type: "PingPong", data: "ping" }));
  }, 2000);

  ws.on("message", (data) => {
    const message = JSON.parse(data);
    if (message.type === "status") {
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

/**
 * @openapi
 * /restaurants:
 *   get:
 *     summary: List all active restaurants
 *     tags:
 *       - Restaurants
 *     description: Retrieve all available restaurants.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active restaurants.
 *   post:
 *     summary: Create new restaurant
 *     tags:
 *       - Restaurants
 *     description: Add a new restaurant profile.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - cuisine
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               cuisine:
 *                 type: string
 *               openingHours:
 *                 type: string
 *     responses:
 *       201:
 *         description: Restaurant created.
 *       400:
 *         description: Missing or invalid parameters.
 */
restaurantsRouter
  .route("/")
  .get(authMiddleware, restaurantController.getAllRestaurants)
  .post(
    authMiddleware,
    bodyParser.json(),
    restaurantController.createRestaurant
  );

/**
 * @openapi
 * /restaurants/{id}:
 *   get:
 *     summary: Get restaurant by ID
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant details.
 *       404:
 *         description: Restaurant not found.
 *   put:
 *     summary: Update restaurant details
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Restaurant updated.
 *   delete:
 *     summary: Delete restaurant by ID
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant deleted.
 */
restaurantsRouter
  .route("/:id")
  .get(authMiddleware, restaurantController.getRestaurantsByID)
  .put(
    authMiddleware,
    bodyParser.json(),
    restaurantController.updateRestaurantByID
  )
  .delete(authMiddleware, restaurantController.deleteRestaurantByID);

/**
 * @openapi
 * /restaurants/{restaurantID}/items:
 *   get:
 *     summary: Get menu items for restaurant
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: restaurantID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu items list.
 *   post:
 *     summary: Add new menu item to restaurant
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: restaurantID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Menu item added.
 */
restaurantsRouter
  .route("/:restaurantID/items")
  .get(authMiddleware, restaurantController.getMenuOfRestaurant)
  .post(
    authMiddleware,
    bodyParser.json(),
    restaurantController.createItemForRestaurant
  );

/**
 * @openapi
 * /restaurants/{restaurantID}/items/{itemID}:
 *   put:
 *     summary: Update menu item
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: restaurantID
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Menu item updated.
 *   delete:
 *     summary: Delete menu item
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: restaurantID
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu item deleted.
 */
restaurantsRouter
  .route("/:restaurantID/items/:itemID")
  .put(
    authMiddleware,
    bodyParser.json(),
    restaurantController.updateItemOfRestaurant
  )
  .delete(authMiddleware, restaurantController.deleteItemInRestaurant);

export default restaurantsRouter;
