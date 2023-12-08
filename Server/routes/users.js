import bodyParser from "body-parser";
import express from "express";
import { validateJWTCookie } from "../utils.js";
import userWsController from "../controller/ws/user.js";
import expressWs from "express-ws";

const userRouter = express.Router();

expressWs(userRouter);

userRouter.ws("/ws", (ws, req) => {
  const payload = {
    type: "open",
  };
  const interval = setInterval(() => {
    ws.send(JSON.stringify({ type: "PingPong", data: "ping" }));
  }, 2000);
  try {
    const user = validateJWTCookie(req.cookies.token);
    ws.user = user;
  } catch (e) {}
  userWsController.setUserSocket(ws);

  ws.send(JSON.stringify(payload));

  ws.on("message", (data) => {
    const message = JSON.parse(data);

    if (message.type === "get_driver_location")
      userWsController.getDriverDetails(ws, message);
  });
  ws.on("close", () => {
    clearInterval(interval);
    userWsController.closeUserSocket(ws);
  });
});

export default userRouter;
