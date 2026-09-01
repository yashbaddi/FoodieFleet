import express from "express";
import bodyParser from "body-parser";

import orderController from "../controller/orders.js";
import { authMiddleware } from "../middlewares/auth.js";

const ordersRouter = express.Router();

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Get user orders
 *     tags:
 *       - Orders
 *     description: Retrieve all past and current orders for the logged-in user.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders.
 *       401:
 *         description: Unauthorized.
 *   post:
 *     summary: Create new order
 *     tags:
 *       - Orders
 *     description: Place a new food delivery order from a restaurant.
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
 *               - restaurantId
 *               - items
 *               - deliveryAddress
 *             properties:
 *               restaurantId:
 *                 type: string
 *               deliveryAddress:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - itemId
 *                     - quantity
 *                   properties:
 *                     itemId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Order placed successfully.
 *       400:
 *         description: Invalid order parameters.
 *       401:
 *         description: Unauthorized.
 */
ordersRouter
  .route("/")
  .get(authMiddleware, orderController.getOrdersByUserID)
  .post(authMiddleware, bodyParser.json(), orderController.createNewOrder);

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: Get order details by ID
 *     tags:
 *       - Orders
 *     description: Fetch comprehensive details for a specific order.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique order ID.
 *     responses:
 *       200:
 *         description: Order details.
 *       404:
 *         description: Order not found.
 *   patch:
 *     summary: Update order status or details
 *     tags:
 *       - Orders
 *     description: Update an order's status (e.g. status transition like PREPARING, OUT_FOR_DELIVERY, DELIVERED).
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique order ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "PREPARING"
 *     responses:
 *       200:
 *         description: Order updated successfully.
 *       400:
 *         description: Invalid update payload.
 *       404:
 *         description: Order not found.
 */
ordersRouter
  .route("/:id")
  .get(authMiddleware, orderController.getOrdersByOrderID)
  .patch(authMiddleware, bodyParser.json(), orderController.patchCurrentOrder);

ordersRouter.route(":id/item/:itemId");

export default ordersRouter;
