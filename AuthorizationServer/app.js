import express from "express";
import cookieParser from "cookie-parser";
import oauthRouter from "./routes/oauth.js";
import clientRouter from "./routes/client.js";
import usersRouter from "./routes/users.js";
import sessionRouter from "./routes/session.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
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

app.listen(4000);
