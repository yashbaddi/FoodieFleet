import express from "express";
import cookieParser from "cookie-parser";
import oauthRouter from "./routes/oauth.js";
import clientRouter from "./routes/client.js";
import usersRouter from "./routes/users.js";
import sessionRouter from "./routes/session.js";
import cors from "cors";
import config from "./config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

app.use("/client", clientRouter);
app.use("/oauth", oauthRouter);
app.use("/session", sessionRouter);
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  res.status(err.code || 500).json(err);
});

app.listen(config.port);
