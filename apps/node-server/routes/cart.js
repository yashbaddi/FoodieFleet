import express from "express";
import bodyParser from "body-parser";

import cartCorntroller from "../controller/cart.js";
import { authMiddleware } from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter
  .route("/")
  .get(authMiddleware, cartCorntroller.readCart)
  .put(authMiddleware, bodyParser.json(), cartCorntroller.updateCart);

export default cartRouter;
