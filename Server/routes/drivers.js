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

  ws.on("close", () => {
    driverWsController.closeDriverSocket(ws);
  });
});

export default driversRouter;
