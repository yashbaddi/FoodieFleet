import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config.js";
import path from "path";
import expressWs from "express-ws";
import apiRouter from "./routes/api.js";

const app = express();

expressWs(app);
app.use(cookieParser());

app.use(
  cors({
    origin: config.app.corsOrigin,
    credentials: true,
  })
);

app.use("/api", apiRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/Client/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/Client/dist/index.html"))
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(config.app.port, () => {
  console.log(`applicaton Listening to port ${config.app.port}`);
});
