import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import config from "./config.js";
import path from "path";
import expressWs from "express-ws";
import apiRouter from "./routes/api.js";

const app = express();

expressWs(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: config.app.corsOrigin,
    credentials: true,
  }),
);

app.use("/api", apiRouter);

// Catch unhandled API requests so they return JSON 404 instead of index.html
app.all("/api/*", (req, res) => {
  res
    .status(404)
    .json({ message: `API endpoint ${req.originalUrl} not found` });
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/Client/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/Client/dist/index.html")),
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

app.listen(config.app.port, () => {
  console.log(`applicaton Listening to port ${config.app.port}`);
});
