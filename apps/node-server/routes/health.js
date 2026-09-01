import express from "express";
import pool, { redisClient } from "../model/db-connection.js";

const healthRouter = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: System health check
 *     tags:
 *       - Health
 *     description: Returns server operational status and health of dependent services (PostgreSQL and Redis).
 *     responses:
 *       200:
 *         description: Server and dependencies are healthy (UP).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "UP"
 *                 timestamp:
 *                   type: string
 *                   example: "2026-08-31T20:00:00.000Z"
 *                 uptime:
 *                   type: number
 *                   example: 1245.5
 *                 services:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: string
 *                       example: "connected"
 *                     redis:
 *                       type: string
 *                       example: "connected"
 *       503:
 *         description: Server is degraded or dependencies are disconnected.
 */
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
