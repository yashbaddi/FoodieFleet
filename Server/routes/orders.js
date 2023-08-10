import express from "express";
import bodyParser from "body-parser";
import {
  createEmptyOrder,
  getOrdersByOrderID,
  updateCurrentOrder,
} from "../controller/orders.js";

const ordersRouter = express.Router();

ordersRouter.route("/").post(bodyParser.json(), createEmptyOrder);

ordersRouter
  .route("/:id")
  .get(getOrdersByOrderID)
  .put(bodyParser.json(), updateCurrentOrder);

export default ordersRouter;
