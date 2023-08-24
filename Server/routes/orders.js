import express from "express";
import bodyParser from "body-parser";

import orderController from "../controller/orders.js";

const ordersRouter = express.Router();

ordersRouter.route("/").post(bodyParser.json(), orderController.createNewOrder);

ordersRouter
  .route("/:id")
  .get(orderController.getOrdersByOrderID)
  .patch(bodyParser.json(), orderController.patchCurrentOrder);

ordersRouter.route(":id/item/:itemId");

export default ordersRouter;
