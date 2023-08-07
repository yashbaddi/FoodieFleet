import express from "express";
import cors from "cors";
import config from "./config.js";
import restaurantsRouter from "./routes/restaurants.js";
import ordersRouter from "./routes/orders.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/restaurants", restaurantsRouter);
app.use("/orders", ordersRouter);

app.listen(config.app.port, () => {
  console.log(`applicaton Listening to port 3000 ${config.app.port}`);
});
