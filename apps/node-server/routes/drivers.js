import express from "express";
import { validateJWTCookie } from "../utils.js";
import driverWsController from "../controller/ws/driver.js";
import expressWs from "express-ws";
import { authMiddleware } from "../middlewares/auth.js";
import { driverController } from "../controller/driver.js";
import bodyParser from "body-parser";

const driversRouter = express.Router();
expressWs(driversRouter);

/**
 * @openapi
 * /driver/ws:
 *   get:
 *     summary: Delivery Driver WebSocket stream
 *     tags:
 *       - Drivers
 *     description: Real-time WebSocket connection for delivery partners to stream GPS location updates and accept/update order delivery status.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       101:
 *         description: Switching protocols to WebSocket stream.
 */
driversRouter.ws("/ws", (ws, req) => {
  const payload = {
    type: "open",
  };

  try {
    const user = validateJWTCookie(req.cookies.token);
    ws.user = user;
  } catch (e) {
    console.log(e);
  }
  driverWsController.addDriverSocket(ws);

  ws.send(JSON.stringify(payload));
  // ws.on("connection", (ws, req) => {

  // });
  const interval = setInterval(() => {
    ws.send(JSON.stringify({ type: "PingPong", data: "ping" }));
  }, 2000);

  ws.on("message", (data) => {
    const message = JSON.parse(data);
    if (message.type === "open");
    if (message.type === "location")
      driverWsController.updateLocation(ws, message);
    if (message.type === "partner_status")
      driverWsController.updateStatus(ws, message);
    if (message.type === "status")
      driverWsController.updateOrderStatus(ws, message);
  });

  ws.on("close", () => {
    clearInterval(interval);
    driverWsController.closeDriverSocket(ws);
  });
});

/**
 * @openapi
 * /driver:
 *   get:
 *     summary: Get driver account & assignment details
 *     tags:
 *       - Drivers
 *     description: Retrieve active driver profile, current status, vehicle information, and assigned delivery order.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Driver details retrieved successfully.
 *       401:
 *         description: Unauthorized.
 */
driversRouter.route("/").get(authMiddleware, driverController.getDriverDetails);

export default driversRouter;
