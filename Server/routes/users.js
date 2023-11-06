import bodyParser from "body-parser";
import express from "express";
import { validateJWTCookie } from "../utils.js";
import { userWsController } from "../controller/ws/user.js";
import expressWs from "express-ws";

const userRouter = express.Router();

expressWs(userRouter);

userRouter.ws("/ws", (ws, req) => {
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
  userWsController.setUserSocket(ws);

  ws.send(JSON.stringify(payload));
  ws.on("close", () => {
    userWsController.closeUserSocket(ws);
  });
});

export default userRouter;
