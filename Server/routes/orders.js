import express from "express";
import bodyParser from "body-parser";

import orderController from "../controller/orders.js";
import { authMiddleware } from "../middlewares/auth.js";

const ordersRouter = express.Router();

ordersRouter
  .route("/")
  .post(authMiddleware, bodyParser.json(), orderController.createNewOrder);

ordersRouter
  .route("/:id")
  .get(authMiddleware, orderController.getOrdersByOrderID)
  .patch(authMiddleware, bodyParser.json(), orderController.patchCurrentOrder);

ordersRouter.route(":id/item/:itemId");

export default ordersRouter;
