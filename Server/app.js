import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import restaurantsRouter from "./routes/restaurants.js";
import ordersRouter from "./routes/orders.js";
import cartRouter from "./routes/cart.js";
import authRouter from "./routes/auth.js";
import config from "./config.js";
import driversRouter from "./routes/drivers.js";
import userRouter from "./routes/users.js";
import expressWs from "express-ws";

const app = express();

expressWs(app);
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4000"],
    credentials: true,
  })
);

app.use("/restaurants", restaurantsRouter);
app.use("/orders", ordersRouter);
app.use("/cart", cartRouter);
app.use("/driver", driversRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(config.app.port, () => {
  console.log(`applicaton Listening to port ${config.app.port}`);
});
