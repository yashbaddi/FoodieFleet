import jwt from "jsonwebtoken";
import config from "../config.js";
import userService from "../services/users.js";

export async function authMiddleware(req, res, next) {
  try {
    const payload = jwt.verify(req.cookies.token, config.oauth.clientSecret);
    res.locals.userID = payload.sub.id;
    console.log(res.locals.userID);
    userService.createUserIfNotExists(res.locals.userID);
    next();
  } catch (e) {
    console.log("Error IN Auth MiddleWare", e);
    res.status(401).json({ message: "Unauthorized" });
  }
}
