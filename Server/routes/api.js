import express from "express";
import restaurantsRouter from "./restaurants";
import ordersRouter from "./orders";
import cartRouter from "./cart";
import driversRouter from "./drivers";
import userRouter from "./users";
import authRouter from "./auth";

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
