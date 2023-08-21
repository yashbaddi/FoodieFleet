import express from "express";
import { readItemsInCart } from "../model/cart";
import bodyParser from "body-parser";
import { updateCart } from "../controller/cart";

const cartRouter = express.Router();

cartRouter.route("/").get(readItemsInCart).put(bodyParser.json(), updateCart);

export default cartRouter;
