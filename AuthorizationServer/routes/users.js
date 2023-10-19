import express from "express";
import { createUser } from "../controllers/users.js";

const usersRouter = express.Router();

usersRouter.post("/", createUser);

export default usersRouter;
