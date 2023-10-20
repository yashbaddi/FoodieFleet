import express from "express";
import {
  authorizeSession,
  createSession,
  deleteSession,
} from "../controllers/session.js";
import { isAuthenticated } from "../middlewares/auth.js";

const sessionRouter = express.Router();

sessionRouter.get("/", isAuthenticated, authorizeSession);
sessionRouter.post("/", createSession);
sessionRouter.delete("/", isAuthenticated, deleteSession);

export default sessionRouter;
