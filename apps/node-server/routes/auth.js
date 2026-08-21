import express from "express";
import authController from "../controller/auth.js";
import { authMiddleware } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter
  .route("/login")
  .post(authController.login)
  .all((req, res) => {
    res.status(405).json({ message: "Method Not Allowed. Please send a POST request with email and password." });
  });

authRouter
  .route("/register")
  .post(authController.register)
  .all((req, res) => {
    res.status(405).json({ message: "Method Not Allowed. Please send a POST request to register." });
  });

authRouter
  .route("/logout")
  .post(authController.logout)
  .all((req, res) => {
    res.status(405).json({ message: "Method Not Allowed. Please send a POST request to log out." });
  });

authRouter.get("/me", authMiddleware, authController.me);

export default authRouter;
