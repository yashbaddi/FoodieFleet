import express from "express";
import { validateJWTCookie } from "../utils.js";
import driverWsController from "../controller/ws/driver.js";
import expressWs from "express-ws";

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
    if (wsRequest.type === "open");
    if (wsRequest.type === "location")
      driverWsController.updateLocation(ws, wsRequest);
    if (wsRequest.type === "status")
      driverWsController.updateStatus(ws, wsRequest);
    if (wsRequest.type === "orderStatus")
      driverWsController.updateOrderStatus(ws, wsRequest);
  });

  ws.on("close", () => {
    clearInterval(interval);
    driverWsController.closeDriverSocket(ws);
  });
});

export default driversRouter;
