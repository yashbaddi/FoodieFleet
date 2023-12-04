import express from "express";
import restaurantsRouter from "./restaurants.js";
import ordersRouter from "./orders.js";
import cartRouter from "./cart.js";
import driversRouter from "./drivers.js";
import userRouter from "./users.js";
import authRouter from "./auth.js";
import expressWs from "express-ws";
import cookieParser from "cookie-parser";

const apiRouter = express.Router();
expressWs(apiRouter);
apiRouter.use(cookieParser());

apiRouter.use("/restaurants", restaurantsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/driver", driversRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
