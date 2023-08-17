import express from "express";
import bodyParser from "body-parser";
import {
  createEmptyOrder,
  getOrdersByOrderID,
  patchCurrentOrder,
} from "../controller/orders.js";

const ordersRouter = express.Router();

ordersRouter.route("/").post(bodyParser.json(), createEmptyOrder);

ordersRouter
  .route("/:id")
  .get(getOrdersByOrderID)
  .patch(bodyParser.json(), patchCurrentOrder);

ordersRouter.route(":id/item/:itemId");

export default ordersRouter;
