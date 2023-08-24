import express from "express";
import bodyParser from "body-parser";

import cartCorntroller from "../controller/cart.js";

const cartRouter = express.Router();

cartRouter
  .route("/")
  .get(cartCorntroller.readCart)
  .put(bodyParser.json(), cartCorntroller.updateCart);

export default cartRouter;
