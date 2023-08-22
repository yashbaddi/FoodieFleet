import express from "express";
import bodyParser from "body-parser";
import {
  createNewOrder,
  getOrdersByOrderID,
  patchCurrentOrder,
} from "../controller/orders.js";

const ordersRouter = express.Router();

ordersRouter.route("/").post(bodyParser.json(), createNewOrder);

ordersRouter
  .route("/:id")
  .get(getOrdersByOrderID)
  .patch(bodyParser.json(), patchCurrentOrder);

ordersRouter.route(":id/item/:itemId");

export default ordersRouter;
