import express from "express";
import bodyParser from "body-parser";
import { readCart, updateCart } from "../controller/cart.js";

const cartRouter = express.Router();

cartRouter.route("/").get(readCart).put(bodyParser.json(), updateCart);

export default cartRouter;
