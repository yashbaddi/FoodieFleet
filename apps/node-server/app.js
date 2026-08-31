import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import config from "./config.js";
import path from "path";
import expressWs from "express-ws";
import apiRouter from "./routes/api.js";
import healthRouter from "./routes/health.js";
import pool, { redisClient } from "./model/db-connection.js";

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

app.use("/health", healthRouter);
app.use("/api", apiRouter);

// Catch unhandled API requests so they return JSON 404 instead of index.html
app.all("/api/*", (req, res) => {
  res
    .status(404)
    .json({ message: `API endpoint ${req.originalUrl} not found` });
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../web/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../web/dist/index.html")),
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

const server = app.listen(config.app.port, () => {
  console.log(`Application listening to port ${config.app.port}`);
});

let isShuttingDown = false;

const gracefulShutdown = async (signal) => {
  if (isShuttingDown) {
    console.log(`Shutdown already in progress. Ignoring ${signal}.`);
    return;
  }
  isShuttingDown = true;
  console.log(`Received ${signal}. Initiating graceful shutdown...`);

  // Force shutdown timer after 10 seconds if connections fail to close
  const forceExitTimeout = setTimeout(() => {
    console.error("Graceful shutdown timed out after 10s. Forcing exit...");
    process.exit(1);
  }, 10000);
  forceExitTimeout.unref();

  try {
    // 1. Close HTTP & WebSocket server to stop accepting new requests
    await new Promise((resolve) => {
      server.close((err) => {
        if (err) {
          console.error("Error closing HTTP server:", err);
        } else {
          console.log("HTTP server closed.");
        }
        resolve();
      });
    });

    // 2. Disconnect Redis client
    if (redisClient && typeof redisClient.quit === "function") {
      try {
        await redisClient.quit();
        console.log("Redis client disconnected.");
      } catch (err) {
        console.error("Error disconnecting Redis client:", err);
      }
    }

    // 3. Close PostgreSQL connection pool
    if (pool && typeof pool.end === "function") {
      try {
        await pool.end();
        console.log("PostgreSQL connection pool closed.");
      } catch (err) {
        console.error("Error ending PostgreSQL pool:", err);
      }
    }

    console.log("Graceful shutdown completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("unhandledRejection");
});

