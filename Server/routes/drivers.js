import express from "express";
import { validateJWTCookie } from "../utils.js";
import driverWsController from "../controller/ws/driver.js";
import expressWs from "express-ws";
import { authMiddleware } from "../middlewares/auth.js";
import { driverController } from "../controller/driver.js";
import bodyParser from "body-parser";

const driversRouter = express.Router();
expressWs(driversRouter);

driversRouter.ws("/ws", (ws, req) => {
  console.log("inside ws");
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
    console.log("in message", message);
    if (message.type === "open");
    if (message.type === "location")
      driverWsController.updateLocation(ws, message);
    if (message.type === "status") driverWsController.updateStatus(ws, message);
    if (message.type === "orderStatus")
      driverWsController.updateOrderStatus(ws, message);
  });

  ws.on("close", () => {
    clearInterval(interval);
    driverWsController.closeDriverSocket(ws);
  });
});

driversRouter.route("/").get(authMiddleware, driverController.getDriverDetails);

export default driversRouter;
