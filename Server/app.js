import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import restaurantsRouter from "./routes/restaurants.js";
// import ordersRouter from "./routes/orders.js";
// import cartRouter from "./routes/cart.js";
// import authRouter from "./routes/auth.js";
import config from "./config.js";
// import driversRouter from "./routes/drivers.js";
// import userRouter from "./routes/users.js";
import path from "path";
import expressWs from "express-ws";
import apiRouter from "./routes/api.js";

const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/Client/dist")));

expressWs(app);
app.use(cookieParser());

app.use(
  cors({
    origin: config.app.corsOrigin,
    credentials: true,
  })
);

app.use("/api", apiRouter);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/Client/dist/index.html"))
);

// app.use("/restaurants", restaurantsRouter);
// app.use("/orders", ordersRouter);
// app.use("/cart", cartRouter);
// app.use("/driver", driversRouter);
// app.use("/user", userRouter);
// app.use("/auth", authRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(config.app.port, () => {
  console.log(`applicaton Listening to port ${config.app.port}`);
});
