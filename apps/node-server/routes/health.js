import express from "express";
import pool, { redisClient } from "../model/db-connection.js";

const healthRouter = express.Router();

healthRouter.get("/", async (req, res) => {
  let dbStatus = "unknown";
  let redisStatus = "unknown";

  try {
    await pool.query("SELECT 1");
    dbStatus = "connected";
  } catch (err) {
    dbStatus = "disconnected";
  }

  try {
    if (redisClient) {
      const pong = await redisClient.ping();
      redisStatus = pong === "PONG" ? "connected" : "degraded";
    } else {
      redisStatus = "disconnected";
    }
  } catch (err) {
    redisStatus = "disconnected";
  }

  const isHealthy = dbStatus === "connected" && redisStatus === "connected";

  const responsePayload = {
    status: isHealthy ? "UP" : "DEGRADED",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: dbStatus,
      redis: redisStatus,
    },
  };

  res.status(isHealthy ? 200 : 503).json(responsePayload);
});

export default healthRouter;
