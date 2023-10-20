import express from "express";
import authController from "../controller/auth.js";

const authRouter = express.Router();

authRouter.route("/").get(authController.authorize);

authRouter.route("/callback").get(authController.authCallback);

export default authRouter;
